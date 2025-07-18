import React from 'react';
import { Clock, MapPin, User, Phone, Calendar, Edit, Trash2, Heart, Navigation } from 'lucide-react';
import { FoodPost } from '../types';

interface FoodCardProps {
  post: FoodPost;
  onClaim?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  showActions?: boolean;
  showClaimButton?: boolean;
  onGetDirections?: (postId: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  post,
  onClaim,
  onEdit,
  onDelete,
  showActions = false,
  showClaimButton = false,
  onGetDirections,
}) => {
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
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      {/* Food Image with Gradient Overlay */}
      <div className="h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-orange-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {post.photos && post.photos.length > 0 ? (
          <img
            src={post.photos[0]}
            alt={post.foodName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-7xl animate-pulse">🍽️</div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(post.status)} shadow-lg`}>
            <span className="mr-1">{getStatusEmoji(post.status)}</span>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 left-4">
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {post.foodName}
          </h3>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-orange-600" />
            </div>
            <span className="text-sm font-medium">{post.donorName}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">{post.pickupDate}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium">{post.pickupTime}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="bg-green-50 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium truncate">{post.address}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="bg-red-50 p-2 rounded-lg">
              <Phone className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-sm font-medium">{post.contactNumber}</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-800">Available Quantity</span>
            <span className="text-lg font-bold text-green-700">{post.quantity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {showClaimButton && post.status === 'available' && (
          <div className="space-y-3">
            <button
              onClick={() => onClaim?.(post.id)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>🤝</span>
              <span>Claim This Food</span>
            </button>
            
            {onGetDirections && (
              <button
                onClick={() => onGetDirections(post.id)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2 px-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
            )}
          </div>
        )}

        {showActions && (
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit?.(post.id)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-4 rounded-2xl font-bold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete?.(post.id)}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-2xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Claimed Status */}
        {post.status === 'claimed' && post.claimedBy && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🤝</span>
              <div className="text-center">
                <p className="text-sm font-semibold text-orange-800">Claimed by</p>
                <p className="text-sm text-orange-700">{post.claimedBy}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;