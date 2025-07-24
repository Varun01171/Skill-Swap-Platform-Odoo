import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';

const mockUsers = [
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
    skillsWanted: ['React', 'UI/UX Design', 'Photography'],
    location: 'Boston, MA',
    availability: 'Weekdays',
    rating: 4.9,
    bio: 'Data scientist passionate about AI and web development'
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Photography', 'Video Editing', 'Graphic Design'],
    skillsWanted: ['Python', 'Web Development', 'Marketing'],
    location: 'Seattle, WA',
    availability: 'Weekends',
    rating: 4.7,
    bio: 'Creative professional looking to expand into tech'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Marketing', 'Content Writing', 'Social Media'],
    skillsWanted: ['React', 'TypeScript', 'Node.js'],
    location: 'Austin, TX',
    availability: 'Evenings',
    rating: 4.8,
    bio: 'Marketing specialist transitioning to full-stack development'
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Java', 'Spring Boot', 'System Design'],
    skillsWanted: ['Machine Learning', 'Data Science', 'Cloud Architecture'],
    location: 'San Jose, CA',
    availability: 'Flexible',
    rating: 4.6,
    bio: 'Backend engineer interested in AI and cloud technologies'
  }
];

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAvailability = filterAvailability === 'All' || user.availability === filterAvailability;
    
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Skills</h1>
          <p className="text-gray-600 dark:text-gray-300">Connect with fellow students and exchange knowledge</p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or skills..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="All">All Availability</option>
                <option value="Flexible">Flexible</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 group shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-xl border-2 border-gray-100 dark:border-gray-700"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{user.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{user.bio}</p>

              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Can teach:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs border border-indigo-200 dark:border-indigo-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs">
                        +{user.skillsOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wants to learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs border border-emerald-200 dark:border-emerald-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs">
                        +{user.skillsWanted.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{user.availability}</span>
                </div>
                
                <Link
                  to={`/user/${user.id}`}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-all duration-200 group-hover:scale-105 shadow-sm"
                >
                  View Profile
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">No users found matching your criteria</div>
            <p className="text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}