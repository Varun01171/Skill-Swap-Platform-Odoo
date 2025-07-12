import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';

const mockTargetUser = {
  id: '2',
  name: 'Sarah Johnson',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
  skillsWanted: ['React', 'UI/UX Design', 'Photography']
};

export default function CreateSwap() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedWantedSkill, setSelectedWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfferedSkill || !selectedWantedSkill) {
      alert('Please select both skills for the swap');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/requests');
    }, 1000);
  };

  const commonSkills = user?.skillsOffered?.filter(skill =>
    mockTargetUser.skillsWanted.includes(skill)
  ) || [];

  const wantedSkills = mockTargetUser.skillsOffered.filter(skill =>
    user?.skillsWanted?.includes(skill)
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Skill Swap</h1>
            <p className="text-gray-600 dark:text-gray-300">Propose a skill exchange with {mockTargetUser.name}</p>
          </div>

          {/* Target User Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-8 border border-gray-200 dark:border-gray-600">
            <img
              src={mockTargetUser.avatar}
              alt={mockTargetUser.name}
              className="w-12 h-12 rounded-xl"
            />
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold">{mockTargetUser.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Available for skill exchange</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Skills Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  I will teach:
                </label>
                <div className="space-y-2">
                  {commonSkills.length > 0 ? (
                    commonSkills.map((skill, index) => (
                      <label
                        key={index}
                        className={`block p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          selectedOfferedSkill === skill
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="offeredSkill"
                          value={skill}
                          checked={selectedOfferedSkill === skill}
                          onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{skill}</span>
                      </label>
                    ))
                  ) : (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                          No matching skills found. You don't have any skills that {mockTargetUser.name} wants to learn.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  I want to learn:
                </label>
                <div className="space-y-2">
                  {wantedSkills.length > 0 ? (
                    wantedSkills.map((skill, index) => (
                      <label
                        key={index}
                        className={`block p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          selectedWantedSkill === skill
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="wantedSkill"
                          value={skill}
                          checked={selectedWantedSkill === skill}
                          onChange={(e) => setSelectedWantedSkill(e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{skill}</span>
                      </label>
                    ))
                  ) : (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                          No matching skills found. {mockTargetUser.name} doesn't have any skills you want to learn.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Introduce yourself and explain what you'd like to achieve with this skill swap..."
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !selectedOfferedSkill || !selectedWantedSkill}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </button>
            </div>
          </form>

          {(commonSkills.length === 0 || wantedSkills.length === 0) && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                <strong>Tip:</strong> You need to have matching skills to create a swap request. 
                Update your profile to add more skills you can teach or want to learn!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}