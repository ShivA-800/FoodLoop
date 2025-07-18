import React, { useEffect, useRef } from 'react';
import { FoodPost } from '../types';

interface GoogleMapProps {
  posts: FoodPost[];
  onMarkerClick?: (post: FoodPost) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  posts,
  onMarkerClick,
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  zoom = 12,
  className = "w-full h-96 rounded-2xl",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script already exists
      if (document.getElementById('google-maps-script')) {
        return;
      }

      // Load Google Maps script
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCy6yc3AG2H4m18gw5hM4pVG8y2rDIX0UA&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      // Add markers for food posts
      addMarkers();
    };

    const addMarkers = () => {
      if (!mapInstanceRef.current || !window.google) return;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      posts.forEach((post) => {
        if (post.status !== 'available') return;

        const marker = new window.google.maps.Marker({
          position: post.location,
          map: mapInstanceRef.current,
          title: post.foodName,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#fff" stroke-width="2"/>
                <text x="20" y="26" text-anchor="middle" font-size="16" fill="white">🍽️</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
          },
          animation: window.google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 300px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">
                ${post.foodName}
              </h3>
              <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
                <strong>From:</strong> ${post.donorName}
              </p>
              <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
                <strong>Quantity:</strong> ${post.quantity}
              </p>
              <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
                <strong>Pickup:</strong> ${post.pickupDate} at ${post.pickupTime}
              </p>
              <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
                <strong>Address:</strong> ${post.address}
              </p>
              <button 
                onclick="window.claimFood('${post.id}')"
                style="
                  margin-top: 12px;
                  background: linear-gradient(to right, #f97316, #f59e0b);
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 8px;
                  font-weight: bold;
                  cursor: pointer;
                  width: 100%;
                "
              >
                🤝 Claim This Food
              </button>
            </div>
          `,
        });

        marker.addListener('click', () => {
          // Close all other info windows
          markersRef.current.forEach(m => m.infoWindow?.close());
          
          infoWindow.open(mapInstanceRef.current, marker);
          
          if (onMarkerClick) {
            onMarkerClick(post);
          }
        });

        // Store reference to info window
        marker.infoWindow = infoWindow;
        markersRef.current.push(marker);
      });
    };

    // Global function for claiming food from info window
    window.claimFood = (postId: string) => {
      const post = posts.find(p => p.id === postId);
      if (post && onMarkerClick) {
        onMarkerClick(post);
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      markersRef.current.forEach(marker => marker.setMap(null));
      delete window.claimFood;
    };
  }, [posts, center, zoom, onMarkerClick]);

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-2xl shadow-lg" />
    </div>
  );
};

export default GoogleMap;