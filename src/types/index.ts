export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'volunteer';
  avatar?: string;
  totalClaims?: number;
  badges?: string[];
  totalFoodSaved?: number; // in kg
}

export interface FoodPost {
  id: string;
  donorId: string;
  donorName: string;
  foodName: string;
  quantity: string;
  pickupDate: string;
  pickupTime: string;
  contactNumber: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  photos?: string[];
  status: 'available' | 'claimed' | 'expired';
  claimedBy?: string;
  claimedById?: string;
  createdAt: string;
  estimatedWeight?: number; // in kg
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_post' | 'post_claimed' | 'badge_earned';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  postId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
}