import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, User, ArrowRight } from 'lucide-react';

const mockRequests = {
  received: [
    {
      id: '1',
      fromUser: {
        name: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      skillOffered: 'Photography',
      skillWanted: 'React',
      message: 'Hi! I\'d love to help you learn photography in exchange for React lessons. I have 5 years of professional photography experience.',
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      fromUser: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      skillOffered: 'Marketing',
      skillWanted: 'TypeScript',
      message: 'Looking forward to learning TypeScript from you! I can teach you digital marketing strategies that have helped grow several startups.',
      status: 'pending',
      createdAt: '1 day ago'
    }
  ],
  sent: [
    {
      id: '3',
      toUser: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      skillOffered: 'React',
      skillWanted: 'Python',
      message: 'Hi Sarah! I\'m excited to learn Python from you. I can help you with React development and modern frontend practices.',
      status: 'accepted',
      createdAt: '3 days ago'
    },
    {
      id: '4',
      toUser: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      skillOffered: 'UI/UX Design',
      skillWanted: 'System Design',
      message: 'Would love to learn about system design principles from your experience!',
      status: 'pending',
      createdAt: '5 days ago'
    }
  ]
};

export default function Requests() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (requestId: string) => {
    setRequests(prev => ({
      ...prev,
      received: prev.received.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    }));
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => ({
      ...prev,
      received: prev.received.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700';
      case 'accepted': return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700';
      case 'rejected': return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700';
      default: return 'text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skill Swap Requests</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your incoming and outgoing skill exchange requests</p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'received'
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Received ({requests.received.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'sent'
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Sent ({requests.sent.length})
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {activeTab === 'received' && (
            <>
              {requests.received.map((request) => (
                <div
                  key={request.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.fromUser.avatar}
                        alt={request.fromUser.name}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold">{request.fromUser.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{request.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-sm border font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm border border-indigo-200 dark:border-indigo-700 font-medium">
                        {request.skillOffered}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200 dark:border-emerald-700 font-medium">
                        {request.skillWanted}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{request.message}</p>

                  {request.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === 'sent' && (
            <>
              {requests.sent.map((request) => (
                <div
                  key={request.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.toUser.avatar}
                        alt={request.toUser.name}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold">{request.toUser.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{request.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-sm border font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm border border-indigo-200 dark:border-indigo-700 font-medium">
                        {request.skillOffered}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200 dark:border-emerald-700 font-medium">
                        {request.skillWanted}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{request.message}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {((activeTab === 'received' && requests.received.length === 0) ||
          (activeTab === 'sent' && requests.sent.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No {activeTab} requests
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {activeTab === 'received'
                ? "You haven't received any skill swap requests yet."
                : "You haven't sent any skill swap requests yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}