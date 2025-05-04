import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

interface GoogleLocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address?: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
}

const GoogleMapLocationPicker: React.FC<GoogleLocationPickerProps> = ({
  onLocationSelect,
  initialLocation,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      if (initialLocation) {
        onLocationSelect(initialLocation);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            onLocationSelect(userLocation);
            map.setCenter(userLocation);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    },
    [initialLocation, onLocationSelect]
  );

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      try {
        const geocoder = new window.google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });
        const address = response.results[0]?.formatted_address || "";
        onLocationSelect({ lat, lng, address });
      } catch (error) {
        console.error("Geocoding error:", error);
        onLocationSelect({ lat, lng });
      }
    },
    [onLocationSelect]
  );

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="w-full h-[470px] overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={initialLocation || defaultCenter}
        onClick={handleMapClick}
        onLoad={onMapLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {initialLocation && (
          <Marker
            position={initialLocation}
            draggable={true}
            onDragEnd={async (e) => {
              if (!e.latLng) return;
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              onLocationSelect({ lat, lng });
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapLocationPicker;
