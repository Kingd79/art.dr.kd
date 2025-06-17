import React, { useState } from 'react';
import { Search, Filter, BookOpen, Video, Headphones, Download, ExternalLink, Clock, User } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'pdf';
  category: string;
  author: string;
  duration?: string;
  readTime?: string;
  url: string;
  downloadUrl?: string;
  thumbnail?: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  featured: boolean;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Chronic Pain Management',
    description: 'A comprehensive guide to managing chronic pain through physical therapy techniques and lifestyle modifications.',
    type: 'article',
    category: 'Pain Management',
    author: 'Dr. Sarah Wilson',
    readTime: '8 min read',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['chronic pain', 'management', 'lifestyle'],
    difficulty: 'Beginner',
    featured: true
  },
  {
    id: '2',
    title: 'Proper Exercise Form for Knee Recovery',
    description: 'Video demonstration of essential exercises for knee rehabilitation with proper form and technique.',
    type: 'video',
    category: 'Knee Rehabilitation',
    author: 'Dr. Michael Chen',
    duration: '15 min',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/6111563/pexels-photo-6111563.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['knee', 'exercises', 'rehabilitation'],
    difficulty: 'Intermediate',
    featured: true
  },
  {
    id: '3',
    title: 'Mindfulness in Physical Therapy',
    description: 'Exploring the role of mindfulness and mental health in physical recovery and pain management.',
    type: 'podcast',
    category: 'Mental Health',
    author: 'Dr. Emily Rodriguez',
    duration: '32 min',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['mindfulness', 'mental health', 'recovery'],
    difficulty: 'Beginner',
    featured: false
  },
  {
    id: '4',
    title: 'Home Exercise Equipment Guide',
    description: 'Complete guide to selecting and using home exercise equipment for physical therapy.',
    type: 'pdf',
    category: 'Equipment',
    author: 'Physical Therapy Association',
    readTime: '12 min read',
    url: '#',
    downloadUrl: '#',
    thumbnail: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['equipment', 'home therapy', 'guide'],
    difficulty: 'Beginner',
    featured: false
  },
  {
    id: '5',
    title: 'Advanced Spinal Mobilization Techniques',
    description: 'Professional-level techniques for spinal mobilization and manual therapy approaches.',
    type: 'video',
    category: 'Spinal Health',
    author: 'Dr. James Thompson',
    duration: '28 min',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['spine', 'mobilization', 'advanced'],
    difficulty: 'Advanced',
    featured: false
  },
  {
    id: '6',
    title: 'Nutrition for Recovery',
    description: 'How proper nutrition supports physical therapy outcomes and accelerates healing.',
    type: 'article',
    category: 'Nutrition',
    author: 'Dr. Lisa Park',
    readTime: '6 min read',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['nutrition', 'recovery', 'healing'],
    difficulty: 'Beginner',
    featured: true
  }
];

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockResources.map(r => r.category)))];
  const types = ['All', 'article', 'video', 'podcast', 'pdf'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
  });

  const featuredResources = mockResources.filter(r => r.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'podcast': return <Headphones className="h-4 w-4" />;
      case 'pdf': return <Download className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'podcast': return 'bg-purple-100 text-purple-800';
      case 'pdf': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
        <div className="text-sm text-gray-600">
          {filteredResources.length} of {mockResources.length} resources
        </div>
      </div>

      {/* Featured Resources */}
      {searchTerm === '' && selectedCategory === 'All' && selectedType === 'All' && selectedDifficulty === 'All' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{resource.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{resource.duration || resource.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {types.map(type => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty === 'All' ? 'All Levels' : difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img 
                src={resource.thumbnail} 
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{resource.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{resource.duration || resource.readTime}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>View</span>
                </button>
                {resource.downloadUrl && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}