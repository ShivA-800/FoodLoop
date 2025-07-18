import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: (searchParams.get('role') as 'donor' | 'volunteer') || 'donor',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password, formData.role);
      const redirectPath = formData.role === 'donor' ? '/donor/dashboard' : '/volunteer/dashboard';
      navigate(redirectPath);
    } catch (error) {
      setErrors({ general: 'Invalid credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex justify-center items-center space-x-3 mb-8 group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">FoodLoop</span>
            </Link>
            
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">
                {formData.role === 'donor' ? '🏪' : '🤝'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
              <p className="mt-2 text-gray-600">
                Sign in to your account as a{' '}
                <span className={`font-semibold ${formData.role === 'donor' ? 'text-green-600' : 'text-orange-600'}`}>
                  {formData.role === 'donor' ? 'Donor' : 'Volunteer'}
                </span>
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
            {/* Role Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'donor' })}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                  formData.role === 'donor'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <span>🏪</span>
                <span>Donor</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'volunteer' })}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                  formData.role === 'volunteer'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <span>🤝</span>
                <span>Volunteer</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-12 w-full p-4 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-12 pr-12 w-full p-4 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-600 text-sm text-center">{errors.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  formData.role === 'donor'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to={`/signup?role=${formData.role}`}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Join thousands making a difference</span>
              <Sparkles className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;