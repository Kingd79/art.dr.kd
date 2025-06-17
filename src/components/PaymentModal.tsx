import React, { useState } from 'react';
import { X, CreditCard, Lock, Calendar, User, Shield, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onPaymentComplete: (paymentData: any) => void;
}

export function PaymentModal({ isOpen, onClose, amount, description, onPaymentComplete }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    saveCard: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setTimeout(() => {
        onPaymentComplete({
          ...paymentData,
          amount,
          transactionId: `txn_${Date.now()}`,
          status: 'completed'
        });
        setIsProcessing(false);
        setPaymentComplete(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (paymentComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your session has been booked and payment processed.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-bold text-gray-900">${amount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700">
          <div>
            <h2 className="text-xl font-bold text-white">Secure Payment</h2>
            <p className="text-green-100 text-sm">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Your payment information is encrypted and secure
              </span>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span>{description}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">${amount}</span>
              </div>
            </div>
          </div>

          {/* Card Information */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Card Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="h-4 w-4 inline mr-2" />
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ 
                    ...prev, 
                    cardNumber: formatCardNumber(e.target.value) 
                  }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      expiryDate: formatExpiryDate(e.target.value) 
                    }))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="h-4 w-4 inline mr-2" />
                    CVV
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '').substring(0, 4) 
                    }))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Billing Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={paymentData.billingAddress}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, billingAddress: e.target.value }))}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.city}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.zipCode}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      zipCode: e.target.value.replace(/\D/g, '').substring(0, 5) 
                    }))}
                    placeholder="10001"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Card Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="saveCard"
              checked={paymentData.saveCard}
              onChange={(e) => setPaymentData(prev => ({ ...prev, saveCard: e.target.checked }))}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-700">
              Save this card for future payments
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay ${amount}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}