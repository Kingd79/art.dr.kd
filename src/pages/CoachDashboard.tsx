import React, { useState } from 'react';
import { Users, TrendingUp, Calendar, DollarSign, Plus, MessageCircle, Video, FileText } from 'lucide-react';

export function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Active Clients',
      value: '24',
      change: '+3 this month',
      positive: true
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: 'Monthly Revenue',
      value: 'KSh 120,000',
      change: '+15% from last month',
      positive: true
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: 'Sessions This Week',
      value: '18',
      change: '3 pending',
      positive: true
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: 'Client Satisfaction',
      value: '4.9/5',
      change: 'Based on 45 reviews',
      positive: true
    }
  ];

  const recentClients = [
    {
      name: 'Sarah Johnson',
      plan: 'Premium',
      progress: 85,
      lastSession: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      plan: 'Basic',
      progress: 60,
      lastSession: '1 day ago',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Grace Wanjiku',
      plan: 'Elite',
      progress: 92,
      lastSession: 'Today',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const upcomingSessions = [
    {
      client: 'John Doe',
      time: '09:00 AM',
      type: 'Personal Training',
      duration: '60 min'
    },
    {
      client: 'Jane Smith',
      time: '11:00 AM',
      type: 'Consultation',
      duration: '30 min'
    },
    {
      client: 'Bob Wilson',
      time: '02:00 PM',
      type: 'Group Session',
      duration: '45 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Coach Dashboard 💪
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your clients and grow your fitness business
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <Plus className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Add Client</h3>
              <p className="text-sm opacity-90">Onboard new client</p>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <Calendar className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Schedule Session</h3>
              <p className="text-sm opacity-90">Book new appointment</p>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <Video className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Upload Video</h3>
              <p className="text-sm opacity-90">Add workout content</p>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <FileText className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Create Plan</h3>
              <p className="text-sm opacity-90">Design workout plan</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Clients */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Clients</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.plan} Plan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{client.progress}% Progress</div>
                    <div className="text-sm text-gray-600">{client.lastSession}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Calendar
              </button>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.client}</h3>
                      <p className="text-sm text-gray-600">{session.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{session.time}</div>
                    <div className="text-sm text-gray-600">{session.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Revenue chart would go here</p>
              <p className="text-sm text-gray-400">Integration with analytics service needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}