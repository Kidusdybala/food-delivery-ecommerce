import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMarker {
  coords: [number, number];
  name: string;
  type: 'user' | 'restaurant' | 'delivery' | 'customer';
}

interface MapComponentProps {
  locations?: LocationMarker[];
  center?: [number, number];
  zoom?: number;
}

const MapComponent = ({ locations = [], center, zoom = 12 }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          
          if (map.current) {
            map.current.flyTo({
              center: coords,
              zoom: 15,
              duration: 2000
            });

            // Add or update user location marker
            const existingMarker = document.querySelector('.user-location-marker');
            if (existingMarker) {
              existingMarker.remove();
            }

            new mapboxgl.Marker({ 
              color: '#ff6b35',
              className: 'user-location-marker'
            })
              .setLngLat(coords)
              .setPopup(new mapboxgl.Popup().setHTML('<p>Your Location</p>'))
              .addTo(map.current);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center || [-74.006, 40.7128], // NYC default
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add location markers
    locations.forEach(location => {
      let color = '#22c55e'; // default green
      if (location.type === 'user') color = '#ff6b35';
      if (location.type === 'delivery') color = '#3b82f6';
      if (location.type === 'customer') color = '#ef4444';

      new mapboxgl.Marker({ color })
        .setLngLat(location.coords)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div class="p-2">
              <h3 class="font-semibold">${location.name}</h3>
              <p class="text-sm text-gray-600">${location.type.charAt(0).toUpperCase() + location.type.slice(1)} Location</p>
            </div>`
          )
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, locations, center, zoom]);

  if (!mapboxToken) {
    return (
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Restaurants Near You</h2>
            <p className="text-muted-foreground mb-6">
              Enter your Mapbox public token to enable the interactive map feature
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="flex gap-3">
              <Input
                placeholder="Enter your Mapbox public token..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => {
                  if (mapboxToken.trim()) {
                    // Token will be used in the useEffect
                  }
                }}
                variant="food"
              >
                Load Map
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Get your free token at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Find Restaurants Near You</h2>
          <p className="text-muted-foreground mb-6">
            Share your location to see nearby restaurants and track your delivery
          </p>
          <Button 
            onClick={getCurrentLocation}
            variant="food"
            className="mb-6"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Share My Location
          </Button>
        </div>
        
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-luxury">
          <div ref={mapContainer} className="absolute inset-0" />
          
          {/* Location info overlay */}
          {userLocation && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-card">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Your location shared</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Restaurants can now deliver to you
              </p>
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-card">
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Restaurants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;