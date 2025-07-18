import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, TrendingUp, Clock, Sparkles, Heart, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FoodPost } from '../../types';
import FoodCard from '../FoodCard';
import toast from 'react-hot-toast';

const DonorDashboard: React.FC = () => {
  const { user, allFoodPosts, updateFoodPostStatus, deleteFoodPost } = useAuth();
  
  // Filter posts to show only current donor's posts
  const posts = allFoodPosts.filter(post => post.donorId === user?.id);

  const handleEdit = (postId: string) => {
    // Navigate to edit form
    console.log('Edit post:', postId);
    toast.info('Edit functionality coming soon! ✏️');
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this food post?')) {
      deleteFoodPost(postId);
    }
  };

  const stats = {
    totalPosts: posts.length,
    availablePosts: posts.filter(p => p.status === 'available').length,
    claimedPosts: posts.filter(p => p.status === 'claimed').length,
    expiredPosts: posts.filter(p => p.status === 'expired').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for being a food waste warrior. Your contributions make a real difference! 🌟
          </p>
        </div>

        {/* Achievement Banner */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-6 h-6" />
                <span className="text-lg font-semibold">Community Hero</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">You've helped save {stats.claimedPosts * 15} meals!</h2>
              <p className="text-green-100">Keep up the amazing work reducing food waste</p>
            </div>
            <div className="text-6xl animate-pulse">🏆</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Available</p>
                <p className="text-3xl font-bold text-green-600">{stats.availablePosts}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Claimed</p>
                <p className="text-3xl font-bold text-orange-600">{stats.claimedPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-2xl shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Expired</p>
                <p className="text-3xl font-bold text-red-600">{stats.expiredPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Button */}
        <div className="mb-8 text-center">
          <Link
            to="/donor/create-post"
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create New Food Post</span>
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          </Link>
        </div>

        {/* Food Posts */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Food Posts</h2>
          
          {posts.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-center border border-white/20">
              <div className="text-6xl mb-6 animate-bounce">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No food posts yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Start making a difference by creating your first food donation post and help reduce food waste!
              </p>
              <Link
                to="/donor/create-post"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Post</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <FoodCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 Tips for Better Food Donations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⏰</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Post Early</h4>
                <p className="text-gray-600 text-sm">Give volunteers enough time to claim and pick up your food donations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📍</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Clear Location</h4>
                <p className="text-gray-600 text-sm">Provide accurate pickup addresses to make it easy for volunteers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📞</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Stay Available</h4>
                <p className="text-gray-600 text-sm">Keep your phone accessible for volunteer coordination.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🥘</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Food Safety</h4>
                <p className="text-gray-600 text-sm">Ensure food is properly stored and safe for consumption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;