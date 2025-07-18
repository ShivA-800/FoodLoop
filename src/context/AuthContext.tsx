import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState, Notification } from '../types';
import { FoodPost } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'donor' | 'volunteer') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'donor' | 'volunteer') => Promise<void>;
  logout: () => void;
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  broadcastNewFood: (foodPost: FoodPost) => void;
  allFoodPosts: FoodPost[];
  updateFoodPostStatus: (postId: string, status: 'available' | 'claimed' | 'expired', claimedBy?: string) => void;
  deleteFoodPost: (postId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [allFoodPosts, setAllFoodPosts] = useState<FoodPost[]>(() => {
    // Load food posts from localStorage on initialization
    const savedPosts = localStorage.getItem('foodloop_posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // Save food posts to localStorage whenever they change
  const saveFoodPostsToStorage = (posts: FoodPost[]) => {
    localStorage.setItem('foodloop_posts', JSON.stringify(posts));
    setAllFoodPosts(posts);
  };

  const login = async (email: string, password: string, role: 'donor' | 'volunteer') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      totalClaims: role === 'volunteer' ? 0 : undefined,
      badges: role === 'volunteer' ? [] : undefined,
      totalFoodSaved: 0,
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
    });
    
    toast.success(`Welcome back, ${user.name}! 🎉`);
    
    // Load existing food posts from storage
    const savedPosts = localStorage.getItem('foodloop_posts');
    if (savedPosts) {
      setAllFoodPosts(JSON.parse(savedPosts));
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'donor' | 'volunteer') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      name,
      email,
      role,
      totalClaims: role === 'volunteer' ? 0 : undefined,
      badges: role === 'volunteer' ? [] : undefined,
      totalFoodSaved: 0,
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
    });
    
    toast.success(`Account created successfully! Welcome to FoodLoop, ${name}! 🎉`);
    
    // Load existing food posts from storage
    const savedPosts = localStorage.getItem('foodloop_posts');
    if (savedPosts) {
      setAllFoodPosts(JSON.parse(savedPosts));
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    setNotifications([]);
    // Don't clear food posts on logout - they should persist
    toast.success('Logged out successfully! 👋');
  };
  
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };
  
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast.success(notification.title, {
      icon: notification.type === 'new_post' ? '🍽️' : 
            notification.type === 'post_claimed' ? '🤝' : '🏆',
    });
  };

  const broadcastNewFood = (foodPost: FoodPost) => {
    // Add to all food posts and save to localStorage
    const updatedPosts = [foodPost, ...allFoodPosts];
    saveFoodPostsToStorage(updatedPosts);
    
    // Send notification to all volunteers
    if (authState.user?.role !== 'donor') { // Only notify if current user is not the donor
      addNotification({
        userId: 'volunteers',
        type: 'new_post',
        title: '🍽️ New Food Available!',
        message: `${foodPost.foodName} from ${foodPost.donorName} is now available for pickup`,
        read: false,
        postId: foodPost.id,
      });
    }
  };

  const updateFoodPostStatus = (postId: string, status: 'available' | 'claimed' | 'expired', claimedBy?: string) => {
    const updatedPosts = allFoodPosts.map(post => 
      post.id === postId 
        ? { ...post, status, claimedBy, claimedById: authState.user?.id }
        : post
    );
    saveFoodPostsToStorage(updatedPosts);
  };

  const deleteFoodPost = (postId: string) => {
    const updatedPosts = allFoodPosts.filter(post => post.id !== postId);
    saveFoodPostsToStorage(updatedPosts);
    
    toast.success('Food post deleted successfully! 🗑️');
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      signup, 
      logout, 
      notifications,
      markNotificationAsRead,
      addNotification,
      broadcastNewFood,
      allFoodPosts,
      updateFoodPostStatus,
      deleteFoodPost
    }}>
      {children}
    </AuthContext.Provider>
  );
};