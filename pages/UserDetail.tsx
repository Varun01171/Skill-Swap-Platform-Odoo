import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowLeft, MessageSquare } from 'lucide-react';

const mockUser = {
  id: '2',
  name: 'Sarah Johnson',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  skillsOffered: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy'],
  skillsWanted: ['React', 'UI/UX Design', 'Photography', 'Video Editing'],
  location: 'Boston, MA',
  availability: 'Weekdays',
  rating: 4.9,
  bio: 'Passionate data scientist with 3 years of experience in machine learning and AI. I love helping others understand complex data concepts and am excited to learn more about frontend development and creative skills like photography.',
  reviews: [
    { author: 'Mike Chen', rating: 5, comment: 'Sarah is an excellent teacher! She helped me understand Python fundamentals in just a few sessions.' },
    { author: 'Emma Wilson', rating: 5, comment: 'Very patient and knowledgeable. Great at explaining complex ML concepts in simple terms.' }
  ]
};

export default function UserDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/browse"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20 p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mockUser.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{mockUser.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockUser.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{mockUser.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                to={`/create-swap/${mockUser.id}`}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Swap
              </Link>
            </div>
          </div>

          <div className="p-8">
            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{mockUser.bio}</p>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills I Can Teach</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills I Want to Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skillsWanted.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reviews</h3>
              <div className="space-y-4">
                {mockUser.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{review.author}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}