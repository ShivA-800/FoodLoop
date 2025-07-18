import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DonorDashboard from './components/Donor/DonorDashboard';
import FoodDonationForm from './components/Donor/FoodDonationForm';
import DonorHistory from './components/Donor/DonorHistory';
import VolunteerDashboard from './components/Volunteer/VolunteerDashboard';
import VolunteerHistory from './components/Volunteer/VolunteerHistory';
import VolunteerBadges from './components/Volunteer/VolunteerBadges';
import ClaimConfirmation from './components/Volunteer/ClaimConfirmation';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Donor Routes */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/create-post"
          element={
            <ProtectedRoute requiredRole="donor">
              <FoodDonationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/history"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorHistory />
            </ProtectedRoute>
          }
        />

        {/* Protected Volunteer Routes */}
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/history"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/badges"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerBadges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/claim/:postId"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <ClaimConfirmation />
            </ProtectedRoute>
          }
        />

        {/* Fallback Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;