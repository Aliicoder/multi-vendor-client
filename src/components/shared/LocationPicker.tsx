import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import Full-Screen Plugin
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

// Fix Leaflet icon issue
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = [pos.coords.latitude, pos.coords.longitude];
        setPosition(userLocation);
      },
      (err) => {
        console.error("Error getting location:", err);
      }
    );
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLocation = [e.latlng.lat, e.latlng.lng];
        setPosition(newLocation);
        onLocationSelect({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });
    return null;
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15, { animate: true, duration: 1.5 });
      }
    }, [position, map]);
    return null;
  };

  const FullScreenControl = () => {
    const map = useMap();
    useEffect(() => {
      if (!map.fullscreenControl) {
        L.control.fullscreen({ position: "topright" }).addTo(map);
        map.fullscreenControl = true; // Prevent multiple controls
      }
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      center={position || [20, 10]}
      zoom={3}
      className="rounded-md overflow-hidden"
      style={{ height: "var(--locationForm-height, 400px)", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <Marker position={position} icon={markerIcon} />}
      <MapClickHandler />
      <MapUpdater />
      <FullScreenControl />
    </MapContainer>
  );
};

export default LocationPicker;
