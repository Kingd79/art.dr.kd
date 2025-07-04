import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Play, Upload, Search, Filter, Clock, User, Heart, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function VideoLibraryPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'flexibility', name: 'Flexibility' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'motivation', name: 'Motivation' }
  ];

  const mockVideos = [
    {
      id: 1,
      title: 'Full Body HIIT Workout',
      description: 'High-intensity interval training for maximum results',
      thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '25:30',
      category: 'cardio',
      instructor: 'Coach Mike',
      likes: 234,
      views: 1520
    },
    {
      id: 2,
      title: 'Beginner Strength Training',
      description: 'Perfect introduction to weight training',
      thumbnail: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '30:15',
      category: 'strength',
      instructor: 'Coach Sarah',
      likes: 189,
      views: 980
    },
    {
      id: 3,
      title: 'Morning Yoga Flow',
      description: 'Start your day with gentle stretching',
      thumbnail: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '20:45',
      category: 'flexibility',
      instructor: 'Coach Lisa',
      likes: 156,
      views: 750
    },
    {
      id: 4,
      title: 'Nutrition Basics',
      description: 'Understanding macros and meal planning',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:20',
      category: 'nutrition',
      instructor: 'Coach Mike',
      likes: 98,
      views: 420
    }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const newVideo = {
        id: Date.now() + Math.random(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: 'Uploaded by ' + user?.name,
        file: file,
        duration: '00:00',
        category: 'uploaded',
        instructor: user?.name,
        likes: 0,
        views: 0,
        isUploaded: true
      };
      setUploadedVideos(prev => [...prev, newVideo]);
    });
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv']
    },
    multiple: true
  });

  const allVideos = [...mockVideos, ...uploadedVideos];
  
  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Video Library</h1>
          <p className="text-gray-600">
            Access workout videos and upload your own content
          </p>
        </div>

        {/* Upload Section - Only for coaches */}
        {user?.role === 'coach' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Video</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-blue-600">Drop the videos here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop video files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports MP4, AVI, MOV, WMV (Max 100MB per file)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative">
                {video.isUploaded ? (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 hover:scale-110 transform">
                    <Play className="h-6 w-6 text-gray-900" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {video.instructor}
                  </div>
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                    {video.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {video.likes}
                    </div>
                    <div>
                      {video.views} views
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}