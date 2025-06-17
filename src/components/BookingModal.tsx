import React, { useState } from 'react';
import { X, Calendar, Clock, User, Video, MapPin, CreditCard } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapistName?: string;
  onBookSession: (bookingData: any) => void;
}

export function BookingModal({ isOpen, onClose, therapistName = 'Dr. Smith', onBookSession }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('in-person');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen) return null;

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      sessionType,
      notes,
      paymentMethod,
      therapist: therapistName
    };
    onBookSession(bookingData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div>
            <h2 className="text-xl font-bold text-white">Book a Session</h2>
            <p className="text-blue-100 text-sm">with {therapistName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSessionType('in-person')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  sessionType === 'in-person'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MapPin className="h-5 w-5 mb-2" />
                <div className="font-medium">In-Person</div>
                <div className="text-sm text-gray-600">At clinic location</div>
                <div className="text-sm font-medium text-green-600 mt-1">$120</div>
              </button>
              <button
                type="button"
                onClick={() => setSessionType('virtual')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  sessionType === 'virtual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Video className="h-5 w-5 mb-2" />
                <div className="font-medium">Virtual Session</div>
                <div className="text-sm text-gray-600">Video consultation</div>
                <div className="text-sm font-medium text-green-600 mt-1">$100</div>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Select Date
            </label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Clock className="h-4 w-4 inline mr-2" />
              Available Times
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableTimes.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any specific concerns or goals for this session..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <CreditCard className="h-4 w-4 inline mr-2" />
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Pay securely with your card</div>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="insurance"
                  checked={paymentMethod === 'insurance'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Insurance</div>
                  <div className="text-sm text-gray-600">Bill to insurance provider</div>
                </div>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Session Type:</span>
                <span className="capitalize">{sessionType.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime || 'Not selected'}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${sessionType === 'virtual' ? '100' : '120'}</span>
              </div>
            </div>
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
              disabled={!selectedDate || !selectedTime}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}