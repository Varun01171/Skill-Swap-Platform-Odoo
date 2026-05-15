import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, MapPin, Clock, Star, Plus, X, Edit3 } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    availability: user?.availability || '',
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || []
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !formData.skillsOffered.includes(newSkillOffered)) {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !formData.skillsWanted.includes(newSkillWanted)) {
      setFormData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(s => s !== skill)
    }));
  };

  const removeSkillWanted = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(s => s !== skill)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{user?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user?.location || 'Location not set'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{user?.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm font-medium"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-8">
            {isEditing ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skills I Can Teach</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm border border-indigo-200 dark:border-indigo-700 font-medium"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkillOffered(skill)}
                          className="ml-2 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                      className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Add a skill..."
                    />
                    <button
                      onClick={addSkillOffered}
                      className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skills I Want to Learn</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200 dark:border-emerald-700 font-medium"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkillWanted(skill)}
                          className="ml-2 text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkillWanted}
                      onChange={(e) => setNewSkillWanted(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                      className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Add a skill..."
                    />
                    <button
                      onClick={addSkillWanted}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {user?.bio || 'No bio added yet. Click "Edit Profile" to add one!'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills I Can Teach</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.skillsOffered?.length ? (
                      user.skillsOffered.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm border border-indigo-200 dark:border-indigo-700 font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No skills added yet</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills I Want to Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {user?.skillsWanted?.length ? (
                      user.skillsWanted.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200 dark:border-emerald-700 font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}