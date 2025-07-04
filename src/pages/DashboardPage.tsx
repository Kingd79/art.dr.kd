import React from 'react';
import { Calendar, TrendingUp, Play, Target, Clock, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Workouts Completed',
      value: '24',
      change: '+12%',
      positive: true
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: 'Total Hours',
      value: '48',
      change: '+8%',
      positive: true
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: 'Goals Achieved',
      value: '3',
      change: '+1',
      positive: true
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: 'Streak Days',
      value: '7',
      change: '+2',
      positive: true
    }
  ];

  const recentWorkouts = [
    {
      name: 'Full Body Strength',
      date: '2024-01-20',
      duration: '45 min',
      calories: '320',
      completed: true
    },
    {
      name: 'Cardio Blast',
      date: '2024-01-19',
      duration: '30 min',
      calories: '280',
      completed: true
    },
    {
      name: 'Upper Body Focus',
      date: '2024-01-18',
      duration: '40 min',
      calories: '300',
      completed: true
    }
  ];

  const upcomingWorkouts = [
    {
      name: 'Leg Day Intensive',
      date: '2024-01-21',
      time: '09:00 AM',
      coach: 'Coach Mike'
    },
    {
      name: 'Core & Flexibility',
      date: '2024-01-22',
      time: '06:00 PM',
      coach: 'Coach Sarah'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to crush your fitness goals today?
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
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workouts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Play className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-600">{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{workout.duration}</p>
                    <p className="text-sm text-gray-600">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Workouts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {upcomingWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-600">{workout.coach}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{workout.time}</p>
                    <p className="text-sm text-gray-600">{workout.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <Play className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Start Workout</h3>
              <p className="text-sm opacity-90">Begin your scheduled session</p>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <Calendar className="h-6 w-6 mb-2" />
              <h3 className="font-medium">Book Session</h3>
              <p className="text-sm opacity-90">Schedule with your coach</p>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all">
              <TrendingUp className="h-6 w-6 mb-2" />
              <h3 className="font-medium">View Progress</h3>
              <p className="text-sm opacity-90">Check your achievements</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}