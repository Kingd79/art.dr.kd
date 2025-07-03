import React from 'react';
import { X, Check, Zap, Crown, Star } from 'lucide-react';
import { UserPlan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'pro' | 'premium') => void;
  currentPlan: UserPlan;
}

export function PricingModal({ isOpen, onClose, onUpgrade, currentPlan }: PricingModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      icon: Star,
      color: 'gray',
      features: [
        'Up to 2 fitness goals',
        'Basic workout generation',
        'Standard exercise library',
        'Basic customization',
        'Community support'
      ],
      limitations: [
        'No PDF export',
        'No injury tracking',
        'No nutrition tips',
        'No video links'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      icon: Zap,
      color: 'yellow',
      popular: true,
      features: [
        'Unlimited fitness goals',
        'AI-optimized workouts',
        'Injury considerations',
        'PDF export',
        'Video exercise links',
        'Progressive overload planning',
        'Priority support'
      ],
      limitations: [
        'No nutrition recommendations',
        'No advanced analytics'
      ]
    },
    {
      name: 'Premium',
      price: '$39',
      period: 'per month',
      icon: Crown,
      color: 'purple',
      features: [
        'Everything in Pro',
        'Advanced AI algorithms',
        'Nutrition recommendations',
        'Progress tracking integration',
        'Custom exercise variations',
        'Advanced workout preferences',
        'White-label options',
        'API access',
        'Dedicated support'
      ],
      limitations: []
    }
  ];

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colors = {
      gray: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-200'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200'
      }
    };
    return colors[color as keyof typeof colors][variant];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="text-gray-600">Unlock powerful features to create better workout scripts</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = currentPlan === plan.name.toLowerCase();
              const canUpgrade = plan.name !== 'Free' && !isCurrentPlan;
              
              return (
                <div
                  key={plan.name}
                  className={`relative border-2 rounded-2xl p-6 ${
                    plan.popular 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200'
                  } ${isCurrentPlan ? 'bg-gray-50' : 'bg-white'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 ${getColorClasses(plan.color, 'bg')} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-6 w-6 ${getColorClasses(plan.color, 'text')}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-center space-x-3">
                              <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => canUpgrade && onUpgrade(plan.name.toLowerCase() as 'pro' | 'premium')}
                    disabled={!canUpgrade}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      isCurrentPlan
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Upgrade?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
                <p className="text-gray-600 text-sm">Advanced algorithms create optimized workout plans</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
                <p className="text-gray-600 text-sm">PDF exports and professional features for coaches</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Solution</h4>
                <p className="text-gray-600 text-sm">Everything you need to run a successful fitness business</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All plans include a 14-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}