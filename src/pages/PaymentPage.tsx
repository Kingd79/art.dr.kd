import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, Clock, Star, ArrowLeft } from 'lucide-react';
import { MpesaPayment } from '../components/MpesaPayment';

export function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 2500,
      period: 'month',
      features: [
        'Access to basic workout plans',
        'Community support',
        'Progress tracking',
        'Mobile app access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 5000,
      period: 'month',
      features: [
        'Everything in Basic',
        'Personal coach assignment',
        'Custom workout plans',
        'Video call sessions',
        'Nutrition guidance',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      price: 8500,
      period: 'month',
      features: [
        'Everything in Premium',
        'Daily check-ins',
        'Meal planning',
        '24/7 coach availability',
        'Home visit options',
        'Supplement recommendations'
      ]
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handlePaymentSuccess = (txnId: string) => {
    setTransactionId(txnId);
    setPaymentSuccess(true);
    
    // In a real app, you would:
    // 1. Update user subscription in backend
    // 2. Send confirmation email
    // 3. Update user context
    console.log('Payment successful:', txnId);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // Show error message to user
    alert(`Payment failed: ${error}`);
  };

  const handleBackToPlans = () => {
    setShowPayment(false);
    setPaymentSuccess(false);
    setTransactionId('');
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Successful! 🎉
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your {selectedPlanData?.name} subscription has been activated successfully.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-gray-900 mb-2">Transaction Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span>{selectedPlanData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span>KSh {selectedPlanData?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={handleBackToPlans}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
              >
                Back to Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment && paymentMethod === 'mpesa') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={handleBackToPlans}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Plans
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">
              You're subscribing to {selectedPlanData?.name} for KSh {selectedPlanData?.price.toLocaleString()}/month
            </p>
          </div>

          <MpesaPayment
            amount={selectedPlanData?.price || 0}
            planName={selectedPlanData?.name || ''}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handleBackToPlans}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">
            Select a plan and pay securely with M-Pesa or card
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Plan</h2>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">KSh {plan.price.toLocaleString()}</span>
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
            
            {/* Payment Options */}
            <div className="space-y-4 mb-6">
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('mpesa')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">M-Pesa</h3>
                      <p className="text-sm text-gray-600">Pay with your mobile money</p>
                      <p className="text-xs text-green-600 font-medium">Recommended for Kenya</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'mpesa'}
                    onChange={() => setPaymentMethod('mpesa')}
                    className="h-4 w-4 text-green-600"
                  />
                </div>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Visa, Mastercard accepted</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Card Form - Only show if card is selected */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Card payments coming soon! Please use M-Pesa for now.
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{selectedPlanData?.name}</span>
                <span className="font-medium">KSh {selectedPlanData?.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Transaction Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg">KSh {selectedPlanData?.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={() => setShowPayment(true)}
              disabled={paymentMethod === 'card'}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center ${
                paymentMethod === 'mpesa'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {paymentMethod === 'card' ? (
                'Coming Soon'
              ) : (
                <>
                  <Smartphone className="h-5 w-5 mr-2" />
                  Pay KSh {selectedPlanData?.price.toLocaleString()} with M-Pesa
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                256-bit SSL
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                PCI Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}