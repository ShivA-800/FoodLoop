import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Phone, User, Calendar, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FoodPost } from '../../types';

const ClaimConfirmation: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { allFoodPosts } = useAuth();
  const [post, setPost] = useState<FoodPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get post details from stored posts
    const fetchAndClaimPost = async () => {
      setIsLoading(true);
      
      // Find the post from stored posts
      const foundPost = allFoodPosts.find(p => p.id === postId);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setPost(foundPost || null);
      setIsLoading(false);
    };

    fetchAndClaimPost();
  }, [postId, allFoodPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Processing your claim...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-gray-600 text-lg">Food post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-32 right-32 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-200"></div>
        <div className="absolute top-48 left-48 w-2 h-2 bg-amber-400 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-green-200 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>
          
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Successfully Claimed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            You've successfully claimed a food donation!
          </p>
          <p className="text-lg text-gray-500 flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Thank you for helping reduce food waste and serve the community</span>
            <Heart className="w-5 h-5 text-red-500" />
          </p>
        </div>

        {/* Food Details Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
            <span>🍽️</span>
            <span>Food Details</span>
          </h2>
          
          <div className="space-y-6">
            {/* Food Name */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full shadow-lg">
                <div className="text-2xl">🍽️</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{post.foodName}</h3>
                <p className="text-gray-600 font-medium">Quantity: {post.quantity}</p>
              </div>
            </div>

            {/* Donor Info */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-full shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Donor</p>
                <p className="text-gray-600">{post.donorName}</p>
              </div>
            </div>

            {/* Pickup Date */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-full shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Pickup Date</p>
                <p className="text-gray-600">{post.pickupDate}</p>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Pickup Time</p>
                <p className="text-gray-600">{post.pickupTime}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200">
              <div className="bg-gradient-to-r from-red-500 to-rose-600 p-3 rounded-full shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Contact Number</p>
                <p className="text-gray-600">{post.contactNumber}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl border border-teal-200">
              <div className="bg-gradient-to-r from-teal-500 to-green-600 p-3 rounded-full shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Pickup Address</p>
                <p className="text-gray-600">{post.address}</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <h4 className="font-bold text-amber-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Important Notes</span>
            </h4>
            <ul className="text-sm text-amber-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span>⏰</span>
                <span>Please arrive on time for pickup</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📞</span>
                <span>Contact the donor if you're running late</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>🥡</span>
                <span>Bring appropriate containers for food transport</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>🛡️</span>
                <span>Follow food safety guidelines during transport</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => navigate('/volunteer/dashboard')}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => window.open(`tel:${post.contactNumber}`, '_self')}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Donor</span>
          </button>
        </div>

        {/* Thank You Message */}
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
          <div className="text-6xl mb-4">🙏</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for being part of the solution!
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            Your action helps reduce food waste and serves those in need.
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Every meal rescued makes a difference</span>
            <Heart className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimConfirmation;