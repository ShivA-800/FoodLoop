import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Package, Award, TrendingUp, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FoodPost } from '../../types';

const VolunteerHistory: React.FC = () => {
  const { user } = useAuth();
  
  // Mock claimed posts data
  const [claimedPosts] = useState<FoodPost[]>([
    {
      id: '1',
      donorId: '1',
      donorName: 'Green Leaf Restaurant',
      foodName: 'Fresh Sandwiches',
      quantity: '20 pieces',
      pickupDate: '2024-01-10',
      pickupTime: '6:00 PM',
      contactNumber: '+1 234 567 8900',
      address: '123 Main St, Downtown',
      location: { lat: 40.7128, lng: -74.0060 },
      status: 'claimed',
      claimedBy: user?.name || 'You',
      claimedById: user?.id || '1',
      createdAt: '2024-01-10T10:00:00Z',
      estimatedWeight: 2.5,
    },
    {
      id: '2',
      donorId: '2',
      donorName: 'Office Cafeteria',
      foodName: 'Lunch Buffet Leftovers',
      quantity: '15 portions',
      pickupDate: '2024-01-08',
      pickupTime: '3:00 PM',
      contactNumber: '+1 234 567 8901',
      address: '456 Oak Ave, Midtown',
      location: { lat: 40.7589, lng: -73.9851 },
      status: 'claimed',
      claimedBy: user?.name || 'You',
      claimedById: user?.id || '1',
      createdAt: '2024-01-08T11:30:00Z',
      estimatedWeight: 3.2,
    },
    {
      id: '3',
      donorId: '3',
      donorName: 'Event Catering Co.',
      foodName: 'Wedding Reception Food',
      quantity: '50 servings',
      pickupDate: '2024-01-05',
      pickupTime: '9:00 PM',
      contactNumber: '+1 234 567 8902',
      address: '789 Pine St, Uptown',
      location: { lat: 40.7831, lng: -73.9712 },
      status: 'claimed',
      claimedBy: user?.name || 'You',
      claimedById: user?.id || '1',
      createdAt: '2024-01-05T12:00:00Z',
      estimatedWeight: 8.0,
    },
  ]);

  const stats = {
    totalClaims: claimedPosts.length,
    totalFoodSaved: claimedPosts.reduce((sum, post) => sum + (post.estimatedWeight || 0), 0),
    thisMonth: claimedPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length,
  };

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
            <div className="text-6xl animate-bounce">📊</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Claim History
          </h1>
          <p className="text-xl text-gray-600">
            Track your impact and see all the food you've helped rescue! 🌟
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
                <span className="text-lg font-semibold">Food Rescue Hero</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                You've saved {stats.totalFoodSaved.toFixed(1)}kg of food!
              </h2>
              <p className="text-orange-100">
                That's equivalent to {Math.round(stats.totalFoodSaved * 2.5)} meals rescued from waste
              </p>
            </div>
            <div className="text-6xl animate-pulse">🏆</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Claims</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalClaims}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-2xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Food Saved</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalFoodSaved.toFixed(1)}kg</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <Heart className="w-6 h-6 text-white" />
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
            <span>Claim History</span>
          </h2>

          {claimedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-bounce">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No claims yet</h3>
              <p className="text-gray-600 text-lg">
                Start claiming food donations to see your history here!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {claimedPosts.map((post) => (
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
                            from {post.donorName}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                          ✅ Claimed
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
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 text-center">
                      <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200">
                        <div className="text-2xl mb-2">🌱</div>
                        <p className="text-sm text-gray-600 font-medium">Food Saved</p>
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
              <p className="text-lg font-semibold">CO₂ Saved</p>
              <p className="text-2xl font-bold">{(stats.totalFoodSaved * 2.3).toFixed(1)}kg</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💧</div>
              <p className="text-lg font-semibold">Water Saved</p>
              <p className="text-2xl font-bold">{(stats.totalFoodSaved * 1000).toFixed(0)}L</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🍽️</div>
              <p className="text-lg font-semibold">Meals Provided</p>
              <p className="text-2xl font-bold">{Math.round(stats.totalFoodSaved * 2.5)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;