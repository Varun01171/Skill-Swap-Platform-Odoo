import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Star, Zap } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="absolute top-0 right-0 p-6">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Skill
              </span>{' '}
              <span className="text-gray-900 dark:text-white">Swap</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with fellow students to exchange skills, learn something new, and build meaningful connections.
              Turn your expertise into learning opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Simple steps to start your skill exchange journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">List the skills you can teach and what you want to learn</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find & Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Browse profiles and send swap requests to interesting matches</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Start Learning</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Begin your skill exchange and grow together</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Students</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">1,200+</div>
              <div className="text-gray-600 dark:text-gray-300">Skills Shared</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}