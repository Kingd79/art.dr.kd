export interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export interface MpesaPaymentResponse {
  merchantRequestID: string;
  checkoutRequestID: string;
  responseCode: string;
  responseDescription: string;
  customerMessage: string;
}

export interface PaymentStatus {
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  transactionId?: string;
  amount?: number;
  phoneNumber?: string;
  timestamp?: string;
  errorMessage?: string;
}

class MpesaService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  async initiatePayment(paymentData: MpesaPaymentRequest): Promise<MpesaPaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mpesa/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      throw error;
    }
  }

  async checkPaymentStatus(checkoutRequestID: string): Promise<PaymentStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mpesa/status/${checkoutRequestID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }

  // Simulate M-Pesa payment for demo purposes
  async simulatePayment(paymentData: MpesaPaymentRequest): Promise<MpesaPaymentResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful response
    return {
      merchantRequestID: `MERCHANT_${Date.now()}`,
      checkoutRequestID: `CHECKOUT_${Date.now()}`,
      responseCode: '0',
      responseDescription: 'Success. Request accepted for processing',
      customerMessage: 'Success. Request accepted for processing'
    };
  }

  // Simulate payment status check
  async simulateStatusCheck(checkoutRequestID: string): Promise<PaymentStatus> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate random success/failure for demo
    const isSuccess = Math.random() > 0.2; // 80% success rate

    if (isSuccess) {
      return {
        status: 'success',
        transactionId: `TXN_${Date.now()}`,
        amount: 5000,
        phoneNumber: '254712345678',
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        status: 'failed',
        errorMessage: 'Transaction was cancelled by user'
      };
    }
  }
}

export const mpesaService = new MpesaService();