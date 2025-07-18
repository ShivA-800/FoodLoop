import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Package, TrendingUp, Users, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FoodPost } from '../../types';

const DonorHistory: React.FC = () => {
  const { user } = useAuth();
  
  // Mock donation history data
  const [donationHistory] = useState<FoodPost[]>([
    {
      id: '1',
      donorId: user?.id || '1',
      donorName: user?.name || 'John Doe',
      foodName: 'Fresh Sandwiches',
      quantity: '20 pieces',
      pickupDate: '2024-01-10',
      pickupTime: '6:00 PM',
      contactNumber: '+1 234 567 8900',
      address: '123 Main St, Downtown',
      location: { lat: 40.7128, lng: -74.0060 },
      status: 'claimed',
      claimedBy: 'Local Food Bank',
      createdAt: '2024-01-10T10:00:00Z',
      estimatedWeight: 2.5,
    },
    {
      id: '2',
      donorId: user?.id || '1',
      donorName: user?.name || 'John Doe',
      foodName: 'Leftover Pizza',
      quantity: '15 slices',
      pickupDate: '2024-01-08',
      pickupTime: '7:30 PM',
      contactNumber: '+1 234 567 8900',
      address: '456 Oak Ave, Midtown',
      location: { lat: 40.7589, lng: -73.9851 },
      status: 'claimed',
      claimedBy: 'Community Kitchen',
      createdAt: '2024-01-08T15:30:00Z',
      estimatedWeight: 1.8,
    },
    {
      id: '3',
      donorId: user?.id || '1',
      donorName: user?.name || 'John Doe',
      foodName: 'Catered Lunch',
      quantity: '30 portions',
      pickupDate: '2024-01-05',
      pickupTime: '2:00 PM',
      contactNumber: '+1 234 567 8900',
      address: '789 Pine St, Uptown',
      location: { lat: 40.7831, lng: -73.9712 },
      status: 'expired',
      createdAt: '2024-01-05T08:00:00Z',
      estimatedWeight: 5.2,
    },
    {
      id: '4',
      donorId: user?.id || '1',
      donorName: user?.name || 'John Doe',
      foodName: 'Breakfast Buffet',
      quantity: '25 servings',
      pickupDate: '2024-01-15',
      pickupTime: '10:00 AM',
      contactNumber: '+1 234 567 8900',
      address: '321 Elm St, Downtown',
      location: { lat: 40.7505, lng: -73.9934 },
      status: 'available',
      createdAt: '2024-01-15T06:00:00Z',
      estimatedWeight: 3.7,
    },
  ]);

  const stats = {
    totalPosts: donationHistory.length,
    claimedPosts: donationHistory.filter(p => p.status === 'claimed').length,
    availablePosts: donationHistory.filter(p => p.status === 'available').length,
    expiredPosts: donationHistory.filter(p => p.status === 'expired').length,
    totalFoodDonated: donationHistory.reduce((sum, post) => sum + (post.estimatedWeight || 0), 0),
    thisMonth: donationHistory.filter(post => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'claimed':
        return 'bg-gradient-to-r from-orange-500 to-amber-600 text-white';
      case 'expired':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'available':
        return '✅';
      case 'claimed':
        return '🤝';
      case 'expired':
        return '❌';
      default:
        return '❓';
    }
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
            <div className="text-6xl animate-bounce">📊</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Donation History
          </h1>
          <p className="text-xl text-gray-600">
            Track your contributions and see the impact you've made! 🌟
          </p>
        </div>

        {/* Achievement Banner */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-6 h-6" />
                <span className="text-lg font-semibold">Food Waste Warrior</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                You've donated {stats.totalFoodDonated.toFixed(1)}kg of food!
              </h2>
              <p className="text-green-100">
                That's equivalent to {Math.round(stats.totalFoodDonated * 2.5)} meals saved from waste
              </p>
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
                <p className="text-sm text-gray-600 font-medium">Claimed</p>
                <p className="text-3xl font-bold text-orange-600">{stats.claimedPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Food Donated</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalFoodDonated.toFixed(1)}kg</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">This Month</p>
                <p className="text-3xl font-bold text-blue-600">{stats.thisMonth}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
            <span>📋</span>
            <span>Donation History</span>
          </h2>

          {donationHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-bounce">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No donations yet</h3>
              <p className="text-gray-600 text-lg">
                Create your first food post to see your history here!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {donationHistory.map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {post.foodName}
                          </h3>
                          <p className="text-gray-600 font-medium">
                            Created on {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(post.status)}`}>
                          <span className="mr-1">{getStatusEmoji(post.status)}</span>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{post.pickupDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span>{post.pickupTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Package className="w-4 h-4 text-orange-500" />
                          <span>{post.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="truncate">{post.address}</span>
                        </div>
                      </div>

                      {post.status === 'claimed' && post.claimedBy && (
                        <div className="mt-4 bg-orange-100 border border-orange-200 rounded-xl p-3">
                          <p className="text-orange-800 font-medium text-sm">
                            🤝 Claimed by: <span className="font-bold">{post.claimedBy}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 text-center">
                      <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200">
                        <div className="text-2xl mb-2">🌱</div>
                        <p className="text-sm text-gray-600 font-medium">Food Donated</p>
                        <p className="text-lg font-bold text-green-600">
                          {post.estimatedWeight?.toFixed(1)}kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Impact Summary */}
        <div className="mt-8 bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Your Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🌍</div>
              <p className="text-lg font-semibold">CO₂ Prevented</p>
              <p className="text-2xl font-bold">{(stats.totalFoodDonated * 2.3).toFixed(1)}kg</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💧</div>
              <p className="text-lg font-semibold">Water Saved</p>
              <p className="text-2xl font-bold">{(stats.totalFoodDonated * 1000).toFixed(0)}L</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🍽️</div>
              <p className="text-lg font-semibold">Meals Provided</p>
              <p className="text-2xl font-bold">{Math.round(stats.totalFoodDonated * 2.5)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorHistory;