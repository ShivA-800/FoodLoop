import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">FoodLoop</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">
          {/* Animated Food Icons */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="text-8xl animate-bounce">🍽️</div>
              <div className="absolute -top-2 -right-2 text-3xl animate-pulse">✨</div>
              <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse delay-300">🌟</div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Rescue Food.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 animate-pulse">
              Serve Communities.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform surplus meals into community impact. Connect donors with volunteers 
            to reduce food waste and fight hunger, one meal at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/signup?role=donor"
              className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center space-x-3"
            >
              <span>🏪 Join as Donor</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/signup?role=volunteer"
              className="group relative bg-gradient-to-r from-orange-600 to-amber-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center space-x-3"
            >
              <span>🤝 Join as Volunteer</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 mb-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Quick Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="font-medium">Community Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to make a difference in your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-3xl">🍕</div>
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Surplus Food</h3>
              <p className="text-gray-600 leading-relaxed">
                Restaurants and event organizers post their leftover food with pickup details. 
                Simple, quick, and makes an instant impact.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-3xl">🤝</div>
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Communities</h3>
              <p className="text-gray-600 leading-relaxed">
                Volunteers and NGOs discover nearby food donations and claim them for 
                distribution to those who need it most.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-3xl">🚗</div>
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Pickup</h3>
              <p className="text-gray-600 leading-relaxed">
                Location-based matching ensures convenient pickup. Real-time notifications 
                keep everyone informed throughout the process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="relative z-10 bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Community Impact</h2>
            <p className="text-xl text-green-100">Together, we're making a difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-white mb-2 counter-animation">10,000+</div>
              <div className="text-green-100 text-lg">🍽️ Meals Rescued</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-white mb-2 counter-animation">500+</div>
              <div className="text-green-100 text-lg">🏪 Active Donors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-white mb-2 counter-animation">1,200+</div>
              <div className="text-green-100 text-lg">🤝 Volunteers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">FoodLoop</span>
          </div>
          <p className="text-gray-400 text-lg">
            Together, we can end food waste and hunger in our communities. 🌍✨
          </p>
          
          {/* Made by Shiva Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="relative">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-4 right-1/3 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse delay-300"></div>
                <div className="absolute bottom-2 left-1/3 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-30 animate-pulse delay-700"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-green-900/50 backdrop-blur-sm rounded-3xl px-8 py-6 border border-white/10 shadow-2xl">
                  {/* Animated Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <span className="text-2xl font-bold text-white">S</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                        Crafted with ❤️ by
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-black bg-gradient-to-r from-purple-300 via-blue-300 to-green-300 bg-clip-text text-transparent animate-pulse">
                        SHIVA
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-1 font-medium">
                      Full Stack Developer & UI/UX Designer
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping delay-200"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-6">
            <Link to="/signup?role=donor" className="text-green-400 hover:text-green-300 transition-colors">
              Become a Donor
            </Link>
            <Link to="/signup?role=volunteer" className="text-orange-400 hover:text-orange-300 transition-colors">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;