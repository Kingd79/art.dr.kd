import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { mpesaService, MpesaPaymentRequest, PaymentStatus } from '../services/mpesaService';

interface MpesaPaymentProps {
  amount: number;
  planName: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export function MpesaPayment({ amount, planName, onSuccess, onError, onCancel }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'initiated' | 'pending' | 'success' | 'failed'>('idle');
  const [checkoutRequestID, setCheckoutRequestID] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('254')) {
      return cleaned;
    } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
      return '254' + cleaned;
    }
    
    return cleaned;
  };

  const validatePhoneNumber = (phone: string) => {
    const formatted = formatPhoneNumber(phone);
    return formatted.length === 12 && formatted.startsWith('254');
  };

  const initiatePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      onError('Please enter a valid Kenyan phone number');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('initiated');
    setStatusMessage('Initiating payment...');

    try {
      const paymentData: MpesaPaymentRequest = {
        phoneNumber: formatPhoneNumber(phoneNumber),
        amount: amount,
        accountReference: `FITCOACH_${Date.now()}`,
        transactionDesc: `Payment for ${planName} subscription`
      };

      // Use simulation for demo, replace with actual service call in production
      const response = await mpesaService.simulatePayment(paymentData);
      
      if (response.responseCode === '0') {
        setCheckoutRequestID(response.checkoutRequestID);
        setPaymentStatus('pending');
        setStatusMessage('Payment request sent to your phone. Please enter your M-Pesa PIN to complete the transaction.');
        
        // Start polling for payment status
        pollPaymentStatus(response.checkoutRequestID);
      } else {
        throw new Error(response.responseDescription);
      }
    } catch (error) {
      setPaymentStatus('failed');
      setStatusMessage('Failed to initiate payment. Please try again.');
      onError(error instanceof Error ? error.message : 'Payment initiation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const pollPaymentStatus = async (requestID: string) => {
    let attempts = 0;
    const maxAttempts = 20; // Poll for 1 minute (3s intervals)

    const poll = async () => {
      try {
        attempts++;
        
        // Use simulation for demo
        const status = await mpesaService.simulateStatusCheck(requestID);
        
        if (status.status === 'success') {
          setPaymentStatus('success');
          setStatusMessage('Payment completed successfully!');
          onSuccess(status.transactionId || requestID);
        } else if (status.status === 'failed') {
          setPaymentStatus('failed');
          setStatusMessage(status.errorMessage || 'Payment failed');
          onError(status.errorMessage || 'Payment failed');
        } else if (attempts < maxAttempts) {
          // Continue polling
          setTimeout(poll, 3000);
        } else {
          // Timeout
          setPaymentStatus('failed');
          setStatusMessage('Payment timeout. Please try again.');
          onError('Payment timeout');
        }
      } catch (error) {
        if (attempts < maxAttempts) {
          setTimeout(poll, 3000);
        } else {
          setPaymentStatus('failed');
          setStatusMessage('Unable to verify payment status');
          onError('Payment verification failed');
        }
      }
    };

    poll();
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-600" />;
      case 'failed':
        return <XCircle className="h-12 w-12 text-red-600" />;
      case 'pending':
        return <Clock className="h-12 w-12 text-blue-600 animate-pulse" />;
      default:
        return <Smartphone className="h-12 w-12 text-green-600" />;
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'failed':
        return 'border-red-500 bg-red-50';
      case 'pending':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  if (paymentStatus === 'pending' || paymentStatus === 'success' || paymentStatus === 'failed') {
    return (
      <div className={`border-2 rounded-xl p-8 text-center ${getStatusColor()}`}>
        <div className="flex justify-center mb-4">
          {getStatusIcon()}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {paymentStatus === 'pending' && 'Processing Payment'}
          {paymentStatus === 'success' && 'Payment Successful!'}
          {paymentStatus === 'failed' && 'Payment Failed'}
        </h3>
        
        <p className="text-gray-600 mb-6">{statusMessage}</p>
        
        {paymentStatus === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                Check your phone for the M-Pesa prompt and enter your PIN
              </p>
            </div>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Transaction ID:</strong> {checkoutRequestID}
            </p>
            <p className="text-sm text-green-800">
              <strong>Amount:</strong> KSh {amount.toLocaleString()}
            </p>
          </div>
        )}
        
        {(paymentStatus === 'failed' || paymentStatus === 'success') && (
          <div className="flex space-x-4">
            {paymentStatus === 'failed' && (
              <button
                onClick={() => {
                  setPaymentStatus('idle');
                  setStatusMessage('');
                  setCheckoutRequestID('');
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {paymentStatus === 'success' ? 'Continue' : 'Cancel'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50">
      <div className="flex items-center space-x-3 mb-6">
        <Smartphone className="h-8 w-8 text-green-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Pay with M-Pesa</h3>
          <p className="text-sm text-gray-600">Secure mobile money payment</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0712345678 or 254712345678"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your Safaricom number registered for M-Pesa
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-green-200">
          <h4 className="font-medium text-gray-900 mb-2">Payment Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">KSh {amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction Fee:</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="border-t pt-1 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-green-600">KSh {amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">How it works:</h5>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Enter your M-Pesa registered phone number</li>
            <li>2. Click "Pay Now" to initiate payment</li>
            <li>3. You'll receive an M-Pesa prompt on your phone</li>
            <li>4. Enter your M-Pesa PIN to complete payment</li>
          </ol>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={initiatePayment}
            disabled={isProcessing || !validatePhoneNumber(phoneNumber)}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Clock className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}