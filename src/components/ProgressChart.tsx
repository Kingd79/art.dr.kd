import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProgressData {
  date: string;
  painLevel: number;
  completed: boolean;
}

interface ProgressChartProps {
  data: ProgressData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  const recentData = data.slice(-7); // Last 7 days
  const maxPain = Math.max(...recentData.map(d => d.painLevel));
  const minPain = Math.min(...recentData.map(d => d.painLevel));
  
  const currentPain = recentData[recentData.length - 1]?.painLevel || 0;
  const previousPain = recentData[recentData.length - 2]?.painLevel || currentPain;
  const trend = currentPain < previousPain ? 'down' : currentPain > previousPain ? 'up' : 'stable';

  const getTrendIcon = () => {
    switch (trend) {
      case 'down': return <TrendingDown className="h-5 w-5 text-green-600" />;
      case 'up': return <TrendingUp className="h-5 w-5 text-red-600" />;
      default: return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'down': return 'text-green-600';
      case 'up': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Pain Level Tracking</h3>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend === 'down' ? 'Improving' : trend === 'up' ? 'Worsening' : 'Stable'}
          </span>
        </div>
      </div>

      <div className="relative h-48 mb-4">
        <div className="absolute inset-0 flex items-end justify-between">
          {recentData.map((point, index) => {
            const height = (point.painLevel / 10) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 rounded-t-md transition-all duration-300 ${
                    point.completed ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  style={{ height: `${height}%` }}
                />
                <div className="mt-2 text-xs text-gray-500 text-center">
                  <div>{new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="font-medium">{point.painLevel}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">{currentPain}</div>
          <div className="text-sm text-gray-500">Current</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{minPain}</div>
          <div className="text-sm text-gray-500">Best</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600">{maxPain}</div>
          <div className="text-sm text-gray-500">Worst</div>
        </div>
      </div>
    </div>
  );
}