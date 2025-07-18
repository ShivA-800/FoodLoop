import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Filter, List, Clock, Package, Search, Heart, Award, Navigation } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FoodPost } from '../../types';
import FoodCard from '../FoodCard';
import toast from 'react-hot-toast';
import GoogleMap from '../GoogleMap';

const VolunteerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, addNotification, allFoodPosts, updateFoodPostStatus } = useAuth();
  
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts to show only available ones
  const availablePosts = allFoodPosts.filter(post => post.status === 'available');
  
  // Get recently added posts (within last hour) for "NEW" badges
  const recentPosts = availablePosts.filter(post => {
    const postTime = new Date(post.createdAt).getTime();
    const now = new Date().getTime();
    const oneHour = 60 * 60 * 1000;
    return (now - postTime) < oneHour;
  });

  const handleClaim = (postId: string) => {
    const post = availablePosts.find(p => p.id === postId);
    if (post) {
      // Update post status to claimed
      updateFoodPostStatus(postId, 'claimed', user?.name);
      
      toast.success(`Successfully claimed ${post.foodName}! 🎉`);
      
      // Add notification for successful claim
      addNotification({
        userId: user?.id || '',
        type: 'post_claimed',
        title: 'Food Claimed Successfully!',
        message: `You've claimed ${post.foodName} from ${post.donorName}`,
        read: false,
        postId: postId,
      });
    }
    
    // Navigate to claim confirmation with post data
    navigate(`/volunteer/claim/${postId}`);
  };
  
  const handleGetDirections = (postId: string) => {
    const post = availablePosts.find(p => p.id === postId);
    if (post) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(post.address)}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
      toast.success('Opening directions in Google Maps! 🗺️');
    }
  };

  const stats = {
    totalAvailable: availablePosts.length,
    nearbyPosts: availablePosts.filter(p => p.location.lat > 40.7).length,
    urgentPosts: availablePosts.filter(p => {
      const pickupTime = new Date(`${p.pickupDate}T${p.pickupTime}`);
      const now = new Date();
      const timeDiff = pickupTime.getTime() - now.getTime();
      return timeDiff < 2 * 60 * 60 * 1000; // Less than 2 hours
    }).length,
  };

  const filteredPosts = availablePosts.filter(post =>
    post.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
          {recentPosts.length > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 mb-4 shadow-xl animate-pulse">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🆕</span>
                <span className="font-bold">
                  {recentPosts.length} New Food Post{recentPosts.length > 1 ? 's' : ''} Available!
                </span>
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-green-100 text-sm mt-1">
                Fresh donations just posted by generous donors
              </p>
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Food to Rescue
          </h1>
          <p className="text-xl text-gray-600">
            Discover available food donations and help reduce waste in your community! 🌟
          </p>
        </div>

        {/* Achievement Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-green-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-6 h-6" />
                <span className="text-lg font-semibold">Community Volunteer</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Ready to make a difference?</h2>
              <p className="text-orange-100">Browse and claim food donations below</p>
            </div>
            <div className="text-6xl animate-pulse">🤝</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Available Posts</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalAvailable}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Nearby</p>
                <p className="text-3xl font-bold text-blue-600">{stats.nearbyPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Urgent</p>
                <p className="text-3xl font-bold text-orange-600">{stats.urgentPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food or donor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Map View</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List View</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors font-medium">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <select className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium">
                <option>Sort by: Nearest</option>
                <option>Sort by: Most Recent</option>
                <option>Sort by: Pickup Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <GoogleMap
                posts={filteredPosts}
                onMarkerClick={(post) => handleClaim(post.id)}
                className="w-full h-96 rounded-3xl shadow-xl border border-white/20"
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <span>🍽️</span>
                <span>Available Food Posts</span>
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                    {/* New Post Badge */}
                    {recentPosts.some(recentPost => recentPost.id === post.id) && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block animate-pulse">
                        🆕 NEW
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{post.foodName}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Available
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{post.donorName}</p>
                    <p className="text-sm text-gray-500 mb-3">{post.quantity} • {post.pickupTime}</p>
                    <button
                      onClick={() => handleClaim(post.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2 px-4 rounded-xl font-bold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      🤝 Claim This
                    </button>
                    <button
                      onClick={() => handleGetDirections(post.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-1 px-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 text-sm mt-2 flex items-center justify-center space-x-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Directions</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
              <span>🍽️</span>
              <span>All Available Food Posts</span>
            </h3>
            {filteredPosts.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-center border border-white/20">
                <div className="text-6xl mb-6 animate-bounce">😔</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No food posts available</h3>
                <p className="text-gray-600 text-lg">
                  {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new food donations in your area'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="relative">
                    {/* New Post Badge */}
                    {recentPosts.some(recentPost => recentPost.id === post.id) && (
                      <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                        🆕 NEW
                      </div>
                    )}
                    <FoodCard
                      post={post}
                      onClaim={handleClaim}
                      onGetDirections={handleGetDirections}
                      showClaimButton={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 Tips for Food Rescue</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🚗</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Bring Transportation</h4>
                <p className="text-gray-600 text-sm">Ensure you have proper transportation to safely carry the food.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📱</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Stay Connected</h4>
                <p className="text-gray-600 text-sm">Keep your phone charged and available for donor coordination.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🧊</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Food Safety</h4>
                <p className="text-gray-600 text-sm">Bring coolers if needed to maintain food temperature during transport.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⏰</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Be Punctual</h4>
                <p className="text-gray-600 text-sm">Arrive on time for pickup to ensure food quality and donor trust.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;