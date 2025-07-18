import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Clock, Package, Phone, User, Upload, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const FoodDonationForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, addNotification, broadcastNewFood } = useAuth();
  
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    pickupDate: '',
    pickupTime: '',
    contactNumber: '',
    address: '',
    description: '',
    estimatedWeight: '',
  });
  
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      const imageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...imageUrls].slice(0, 5));
      toast.success(`${acceptedFiles.length} image(s) uploaded! 📸`);
    },
    onDropRejected: (rejectedFiles) => {
      toast.error('Some files were rejected. Please check file size and format.');
    }
  });
  
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.foodName) newErrors.foodName = 'Food name is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.estimatedWeight) newErrors.estimatedWeight = 'Estimated weight is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading('Creating your food post... 🍽️');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the new food post object
      const newFoodPost = {
        id: Date.now().toString(),
        donorId: user?.id || '1',
        donorName: user?.name || 'Anonymous Donor',
        foodName: formData.foodName,
        quantity: formData.quantity,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        contactNumber: formData.contactNumber,
        address: formData.address,
        location: { lat: 40.7128 + Math.random() * 0.1, lng: -74.0060 + Math.random() * 0.1 },
        status: 'available' as const,
        createdAt: new Date().toISOString(),
        estimatedWeight: parseFloat(formData.estimatedWeight),
        photos: uploadedImages,
        description: formData.description,
      };
      
      // Broadcast to all volunteers
      if (broadcastNewFood) {
        broadcastNewFood(newFoodPost);
      }
      
      // Show success notification to donor
      if (addNotification) {
        addNotification({
          userId: user?.id || '',
          type: 'new_post',
          title: '✅ Food Post Created!',
          message: `Your ${formData.foodName} post is now live and volunteers can see it`,
          read: false,
          postId: newFoodPost.id,
        });
      }
      
      toast.dismiss(loadingToast);
      toast.success('Food post created successfully! 🎉');
      
      // Navigate back to dashboard with success message
      navigate('/donor/dashboard');
    } catch (error) {
      console.error('Error creating food post:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to create food post. Please try again.');
      setErrors({ general: 'Failed to create food post' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Food Donation Post</h1>
          <p className="text-gray-600 mt-2">
            Share your surplus food with the community and help reduce waste.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Name */}
            <div>
              <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-2">
                Food Name *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="foodName"
                  name="foodName"
                  type="text"
                  value={formData.foodName}
                  onChange={handleChange}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.foodName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Fresh Sandwiches, Leftover Pizza"
                />
              </div>
              {errors.foodName && <p className="text-red-500 text-sm mt-1">{errors.foodName}</p>}
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 20 pieces, 5 portions, 10 servings"
                />
              </div>
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Estimated Weight */}
            <div>
              <label htmlFor="estimatedWeight" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Weight (kg) *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="estimatedWeight"
                  name="estimatedWeight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.estimatedWeight}
                  onChange={handleChange}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.estimatedWeight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2.5"
                />
              </div>
              {errors.estimatedWeight && <p className="text-red-500 text-sm mt-1">{errors.estimatedWeight}</p>}
            </div>

            {/* Pickup Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
              </div>

              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="pickupTime"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 234 567 8900"
                />
              </div>
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full pickup address"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Interactive map for location selection will be integrated here
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Click on the map to set your pickup location
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any special instructions or additional information..."
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Photos (Optional - Up to 5 images)
              </label>
              
              {/* Image Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragActive 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-green-600 font-medium">Drop the images here...</p>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">
                      Drag & drop food images here, or click to select
                    </p>
                    <p className="text-sm text-gray-400">
                      PNG, JPG, WEBP up to 10MB each (max 5 images)
                    </p>
                  </>
                )}
              </div>
              
              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Uploaded Images ({uploadedImages.length}/5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Food ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>

            {errors.general && (
              <p className="text-red-500 text-sm text-center">{errors.general}</p>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/donor/dashboard')}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Create Food Post</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodDonationForm;