import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProgressChartProps {
  data: {
    date: string;
    averageIntensity: number;
    workoutCount: number;
  }[];
  timeRange: 'week' | 'month' | 'quarter';
}

export function ProgressChart({ data, timeRange }: ProgressChartProps) {
  const maxIntensity = Math.max(...data.map(d => d.averageIntensity));
  const minIntensity = Math.min(...data.map(d => d.averageIntensity));
  const avgIntensity = data.reduce((sum, d) => sum + d.averageIntensity, 0) / data.length;

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 4) return 'bg-green-500';
    if (intensity <= 6) return 'bg-blue-500';
    if (intensity <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getIntensityZone = (intensity: number) => {
    if (intensity <= 4) return 'Too Easy';
    if (intensity <= 6) return 'Optimal';
    if (intensity <= 8) return 'Challenging';
    return 'Too Hard';
  };

  const trend = data.length > 1 ? 
    (data[data.length - 1].averageIntensity > data[0].averageIntensity ? 'increasing' : 'decreasing') : 
    'stable';

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Average Intensity</div>
          <div className="text-2xl font-bold text-gray-900">{avgIntensity.toFixed(1)}</div>
          <div className="text-xs text-gray-500">{getIntensityZone(avgIntensity)}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">Lowest Intensity</div>
          <div className="text-2xl font-bold text-green-900">{minIntensity.toFixed(1)}</div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-600">Highest Intensity</div>
          <div className="text-2xl font-bold text-red-900">{maxIntensity.toFixed(1)}</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">Trend</div>
          <div className="flex items-center space-x-2">
            {trend === 'increasing' ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className="text-lg font-bold text-blue-900 capitalize">{trend}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <div className="flex items-end justify-between h-64 bg-gray-50 rounded-lg p-4">
          {data.map((point, index) => {
            const height = (point.averageIntensity / 10) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1 max-w-16">
                <div className="relative group">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div>Intensity: {point.averageIntensity.toFixed(1)}</div>
                    <div>Workouts: {point.workoutCount}</div>
                    <div>Zone: {getIntensityZone(point.averageIntensity)}</div>
                  </div>
                  
                  {/* Bar */}
                  <div
                    className={`w-8 rounded-t-md transition-all duration-300 ${getIntensityColor(point.averageIntensity)}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                
                {/* Date Label */}
                <div className="mt-2 text-xs text-gray-500 text-center transform -rotate-45 origin-center">
                  {new Date(point.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          <span>10</span>
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>
      </div>

      {/* Intensity Zones Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Too Easy (1-4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Optimal (5-6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Challenging (7-8)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Too Hard (9-10)</span>
        </div>
      </div>
    </div>
  );
}