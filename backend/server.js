const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for demo (use database in production)
const paymentStore = new Map();

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  businessShortCode: process.env.MPESA_BUSINESS_SHORTCODE || '174379',
  passkey: process.env.MPESA_PASSKEY,
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
  baseUrl: process.env.MPESA_ENVIRONMENT === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke'
};

// Generate M-Pesa access token
async function generateAccessToken() {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    const response = await axios.get(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw error;
  }
}

// Generate password for STK push
function generatePassword() {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${MPESA_CONFIG.businessShortCode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');
  return { password, timestamp };
}

// Initiate M-Pesa STK Push
app.post('/api/mpesa/initiate', async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body;
    
    // Validate input
    if (!phoneNumber || !amount || !accountReference) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const accessToken = await generateAccessToken();
    const { password, timestamp } = generatePassword();
    
    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: MPESA_CONFIG.businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc || 'FitCoach Pro Subscription'
    };

    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Store payment request for tracking
    if (response.data.CheckoutRequestID) {
      paymentStore.set(response.data.CheckoutRequestID, {
        phoneNumber,
        amount,
        accountReference,
        status: 'pending',
        createdAt: new Date(),
        merchantRequestID: response.data.MerchantRequestID
      });
    }

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.response?.data || error.message
    });
  }
});

// M-Pesa callback endpoint
app.post('/api/mpesa/callback', (req, res) => {
  console.log('M-Pesa Callback received:', JSON.stringify(req.body, null, 2));
  
  try {
    const callbackData = req.body.Body.stkCallback;
    const checkoutRequestID = callbackData.CheckoutRequestID;
    const resultCode = callbackData.ResultCode;
    const resultDesc = callbackData.ResultDesc;

    // Get stored payment data
    const paymentData = paymentStore.get(checkoutRequestID);
    
    if (!paymentData) {
      console.error('Payment data not found for CheckoutRequestID:', checkoutRequestID);
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = callbackData.CallbackMetadata?.Item || [];
      const amount = callbackMetadata.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber')?.Value;

      // Update payment status
      paymentStore.set(checkoutRequestID, {
        ...paymentData,
        status: 'success',
        mpesaReceiptNumber,
        transactionDate,
        amount,
        phoneNumber,
        completedAt: new Date()
      });

      console.log('Payment successful:', {
        checkoutRequestID,
        mpesaReceiptNumber,
        amount,
        phoneNumber
      });

      // Here you would typically:
      // 1. Update user subscription in database
      // 2. Send confirmation email
      // 3. Trigger any post-payment workflows

    } else {
      // Payment failed
      paymentStore.set(checkoutRequestID, {
        ...paymentData,
        status: 'failed',
        errorMessage: resultDesc,
        failedAt: new Date()
      });

      console.log('Payment failed:', {
        checkoutRequestID,
        resultCode,
        resultDesc
      });
    }

    res.json({ message: 'Callback processed successfully' });

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ message: 'Callback processing failed' });
  }
});

// Check payment status
app.get('/api/mpesa/status/:checkoutRequestID', (req, res) => {
  const { checkoutRequestID } = req.params;
  
  const paymentData = paymentStore.get(checkoutRequestID);
  
  if (!paymentData) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found'
    });
  }

  res.json({
    success: true,
    data: {
      status: paymentData.status,
      checkoutRequestID,
      amount: paymentData.amount,
      phoneNumber: paymentData.phoneNumber,
      mpesaReceiptNumber: paymentData.mpesaReceiptNumber,
      transactionDate: paymentData.transactionDate,
      errorMessage: paymentData.errorMessage
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FitCoach Pro API server running on port ${PORT}`);
  console.log(`📱 M-Pesa Environment: ${MPESA_CONFIG.baseUrl}`);
  console.log(`🔗 Callback URL: ${MPESA_CONFIG.callbackUrl}`);
});

module.exports = app;