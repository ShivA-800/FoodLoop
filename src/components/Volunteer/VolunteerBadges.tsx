import React, { useState, useEffect } from 'react';
import { Award, Star, Trophy, Heart, Zap, Crown, Shield, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../types';

const VolunteerBadges: React.FC = () => {
  const { user, addNotification } = useAuth();
  
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'First Rescue',
      description: 'Claimed your first food donation',
      icon: '🎯',
      requirement: 1,
    },
    {
      id: '2',
      name: 'Food Saver',
      description: 'Rescued 5 food donations',
      icon: '🌟',
      requirement: 5,
    },
    {
      id: '3',
      name: 'Community Hero',
      description: 'Rescued 10 food donations',
      icon: '🦸',
      requirement: 10,
    },
    {
      id: '4',
      name: 'Eco Warrior',
      description: 'Saved 25kg of food from waste',
      icon: '🌱',
      requirement: 25,
    },
    {
      id: '5',
      name: 'Food Champion',
      description: 'Rescued 25 food donations',
      icon: '🏆',
      requirement: 25,
    },
    {
      id: '6',
      name: 'Master Rescuer',
      description: 'Rescued 50 food donations',
      icon: '👑',
      requirement: 50,
    },
    {
      id: '7',
      name: 'Planet Protector',
      description: 'Saved 100kg of food from waste',
      icon: '🌍',
      requirement: 100,
    },
    {
      id: '8',
      name: 'Legend',
      description: 'Rescued 100 food donations',
      icon: '⭐',
      requirement: 100,
    },
  ]);

  // Mock user progress
  const userClaims = user?.totalClaims || 3;
  const userFoodSaved = user?.totalFoodSaved || 13.7;

  const earnedBadges = badges.filter(badge => {
    if (badge.name.includes('kg')) {
      return userFoodSaved >= badge.requirement;
    }
    return userClaims >= badge.requirement;
  });

  const nextBadge = badges.find(badge => {
    if (badge.name.includes('kg')) {
      return userFoodSaved < badge.requirement;
    }
    return userClaims < badge.requirement;
  });

  const getProgress = (badge: Badge) => {
    if (badge.name.includes('kg')) {
      return Math.min((userFoodSaved / badge.requirement) * 100, 100);
    }
    return Math.min((userClaims / badge.requirement) * 100, 100);
  };

  const getCurrentValue = (badge: Badge) => {
    if (badge.name.includes('kg')) {
      return userFoodSaved;
    }
    return userClaims;
  };

  // Check for new badges (simulate)
  useEffect(() => {
    const checkNewBadges = () => {
      earnedBadges.forEach(badge => {
        const isNewBadge = Math.random() > 0.8; // Simulate new badge
        if (isNewBadge && earnedBadges.length > 0) {
          addNotification({
            userId: user?.id || '',
            type: 'badge_earned',
            title: 'New Badge Earned! 🏆',
            message: `Congratulations! You've earned the "${badge.name}" badge!`,
            read: false,
          });
        }
      });
    };

    const timer = setTimeout(checkNewBadges, 2000);
    return () => clearTimeout(timer);
  }, [earnedBadges, addNotification, user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl animate-bounce">🏆</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Badges & Achievements
          </h1>
          <p className="text-xl text-gray-600">
            Celebrate your impact and unlock new achievements! ⭐
          </p>
        </div>

        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-6 h-6" />
                  <span className="text-lg font-semibold">Achievement Progress</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {earnedBadges.length} of {badges.length} badges earned
                </h2>
                <p className="text-purple-100">
                  Keep rescuing food to unlock more achievements!
                </p>
              </div>
              <div className="text-6xl animate-pulse">👑</div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
              ></div>
            </div>

            {/* Next Badge */}
            {nextBadge && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{nextBadge.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">Next: {nextBadge.name}</h3>
                      <p className="text-white/80 text-sm">{nextBadge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      {getCurrentValue(nextBadge).toFixed(nextBadge.name.includes('kg') ? 1 : 0)} / {nextBadge.requirement}
                    </p>
                    <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getProgress(nextBadge)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Badges</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => {
              const isEarned = earnedBadges.some(eb => eb.id === badge.id);
              const progress = getProgress(badge);
              
              return (
                <div
                  key={badge.id}
                  className={`relative bg-white rounded-3xl p-6 shadow-xl border transition-all duration-300 transform hover:-translate-y-2 ${
                    isEarned 
                      ? 'border-yellow-300 shadow-yellow-200/50 hover:shadow-2xl' 
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  {/* Earned Badge Glow */}
                  {isEarned && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl animate-pulse"></div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    {/* Badge Icon */}
                    <div className={`text-6xl mb-4 ${isEarned ? 'animate-bounce' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    
                    {/* Badge Name */}
                    <h3 className={`text-lg font-bold mb-2 ${
                      isEarned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </h3>
                    
                    {/* Badge Description */}
                    <p className={`text-sm mb-4 ${
                      isEarned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {badge.description}
                    </p>
                    
                    {/* Progress */}
                    {!isEarned && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{getCurrentValue(badge).toFixed(badge.name.includes('kg') ? 1 : 0)}</span>
                          <span>{badge.requirement}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {(badge.requirement - getCurrentValue(badge)).toFixed(badge.name.includes('kg') ? 1 : 0)} more to go!
                        </p>
                      </div>
                    )}
                    
                    {/* Earned Status */}
                    {isEarned && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold">
                        ✅ Earned!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Community Leaderboard</span>
          </h2>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Alex Chen', claims: 47, badges: 6, avatar: '🥇' },
              { rank: 2, name: 'Sarah Johnson', claims: 42, badges: 5, avatar: '🥈' },
              { rank: 3, name: user?.name || 'You', claims: userClaims, badges: earnedBadges.length, avatar: '🥉' },
              { rank: 4, name: 'Mike Wilson', claims: 28, badges: 4, avatar: '👤' },
              { rank: 5, name: 'Emma Davis', claims: 25, badges: 4, avatar: '👤' },
            ].map((person) => (
              <div
                key={person.rank}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  person.name === user?.name 
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{person.avatar}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {person.name} {person.name === user?.name && '(You)'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {person.claims} claims • {person.badges} badges
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">#{person.rank}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Keep claiming food to climb the leaderboard! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerBadges;