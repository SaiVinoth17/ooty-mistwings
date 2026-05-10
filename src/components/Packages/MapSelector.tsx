"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSelectorProps {
    onLocationSelect: (loc: { lat: number, lng: number, address: string }) => void;
    placeholder?: string;
    value?: string;
}

const LocationMarker = ({ onSelect, position }: { onSelect: (pos: L.LatLng) => void, position: L.LatLng | null }) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

export default function MapSelector({ onLocationSelect, placeholder, value }: MapSelectorProps) {
    const [address, setAddress] = React.useState(value || '');
    const [position, setPosition] = React.useState<L.LatLng | null>(null);

    const handleSelect = async (pos: L.LatLng) => {
        setPosition(pos);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`);
            const data = await res.json();
            const addr = data.display_name || `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`;
            setAddress(addr);
            onLocationSelect({ lat: pos.lat, lng: pos.lng, address: addr });
        } catch (e) {
            const addr = `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`;
            setAddress(addr);
            onLocationSelect({ lat: pos.lat, lng: pos.lng, address: addr });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', flexGrow: 1 }}>
            <input 
                type="text" 
                value={address} 
                onChange={(e) => {
                    setAddress(e.target.value);
                    onLocationSelect({ lat: 0, lng: 0, address: e.target.value });
                }}
                placeholder={placeholder || "Tap on map or type location..."}
                style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    width: '100%',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    background: 'var(--bg-color)',
                    color: 'var(--text-main)',
                }}
            />
            <div style={{ flexGrow: 1, minHeight: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                <MapContainer center={[11.4102, 76.6950]} zoom={9} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                    />
                    <LocationMarker onSelect={handleSelect} position={position} />
                </MapContainer>
            </div>
        </div>
    );
}
