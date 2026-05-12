"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Search, X, Loader2, Navigation } from 'lucide-react';

// Fix leaflet marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const POPULAR_PLACES = [
    { name: 'Ooty Bus Stand', address: 'Ooty Bus Stand, Udhagamandalam, Tamil Nadu', lat: 11.4132, lng: 76.6954 },
    { name: 'Ooty Railway Station', address: 'Ooty Railway Station, Udhagamandalam, Tamil Nadu', lat: 11.4117, lng: 76.6918 },
    { name: 'Ooty Lake', address: 'Ooty Lake, Udhagamandalam, Tamil Nadu', lat: 11.4051, lng: 76.6981 },
    { name: 'Charring Cross, Ooty', address: 'Charring Cross, Udhagamandalam, Tamil Nadu', lat: 11.4109, lng: 76.6950 },
    { name: 'Botanical Garden, Ooty', address: 'Government Botanical Garden, Ooty, Tamil Nadu', lat: 11.4149, lng: 76.7015 },
    { name: 'Doddabetta Peak', address: 'Doddabetta Peak, Nilgiris, Tamil Nadu', lat: 11.4062, lng: 76.7340 },
    { name: 'Pykara Falls', address: 'Pykara Waterfalls, Pykara, Tamil Nadu', lat: 11.4575, lng: 76.5870 },
    { name: 'Pykara Lake', address: 'Pykara Lake, Pykara, Tamil Nadu', lat: 11.4620, lng: 76.5840 },
    { name: 'Mudumalai Wildlife Sanctuary', address: 'Mudumalai Wildlife Sanctuary, Tamil Nadu', lat: 11.5920, lng: 76.6310 },
    { name: 'Coonoor Bus Stand', address: 'Coonoor Bus Stand, Coonoor, Tamil Nadu', lat: 11.3530, lng: 76.7944 },
    { name: 'Coonoor Railway Station', address: 'Coonoor Railway Station, Coonoor, Tamil Nadu', lat: 11.3527, lng: 76.7938 },
    { name: 'Coimbatore Railway Station', address: 'Coimbatore Junction Railway Station, Tamil Nadu', lat: 11.0010, lng: 76.9659 },
    { name: 'Coimbatore Airport', address: 'Coimbatore International Airport, Tamil Nadu', lat: 11.0296, lng: 77.0434 },
    { name: 'Mettupalayam Railway Station', address: 'Mettupalayam Railway Station, Tamil Nadu', lat: 11.2974, lng: 76.9355 },
    { name: 'Mettupalayam Bus Stand', address: 'Mettupalayam Bus Stand, Tamil Nadu', lat: 11.2970, lng: 76.9338 },
    { name: 'Mysore Railway Station', address: 'Mysore Junction Railway Station, Karnataka', lat: 12.3143, lng: 76.6432 },
    { name: 'Bandipur National Park', address: 'Bandipur National Park, Karnataka', lat: 11.6711, lng: 76.6312 },
    { name: 'Sims Park, Coonoor', address: 'Sims Park, Coonoor, Tamil Nadu', lat: 11.3577, lng: 76.7955 },
    { name: "Dolphin's Nose Viewpoint", address: "Dolphin's Nose Viewpoint, Coonoor, Tamil Nadu", lat: 11.3132, lng: 76.8205 },
    { name: 'Rose Garden, Ooty', address: 'Government Rose Garden, Ooty, Tamil Nadu', lat: 11.4176, lng: 76.6993 },
    { name: 'Tea Factory Museum, Ooty', address: 'Tea Factory and Museum, Ooty, Tamil Nadu', lat: 11.3970, lng: 76.7020 },
    { name: 'Thread Garden, Ooty', address: 'Thread Garden, Ooty, Tamil Nadu', lat: 11.4076, lng: 76.6972 },
    { name: 'Ketti Valley View', address: 'Ketti Valley Viewpoint, Nilgiris, Tamil Nadu', lat: 11.3796, lng: 76.7574 },
    { name: 'Golf Course, Ooty', address: 'Ooty Golf Course, Udhagamandalam, Tamil Nadu', lat: 11.4221, lng: 76.6882 },
];

interface SuggestionResult {
    name: string;
    address: string;
    lat: number;
    lng: number;
}

interface MapSelectorProps {
    onLocationSelect: (loc: { lat: number; lng: number; address: string }) => void;
    placeholder?: string;
    value?: string;
}

// Component that moves the map when position changes
function MapUpdater({ position }: { position: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 13, { animate: true, duration: 1.2 });
        }
    }, [position, map]);
    return null;
}

export default function MapSelector({ onLocationSelect, placeholder, value }: MapSelectorProps) {
    const [query, setQuery] = useState(value || '');
    const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState(value || '');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filtered popular places for quick suggestions
    const filteredPopular = query.length < 2
        ? POPULAR_PLACES.slice(0, 8)
        : POPULAR_PLACES.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.address.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

    const searchNominatim = useCallback(async (q: string) => {
        if (q.length < 3) return;
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ' Tamil Nadu India')}&format=json&limit=5&countrycodes=in`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            const results: SuggestionResult[] = data.map((item: any) => ({
                name: item.display_name.split(',')[0],
                address: item.display_name,
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
            }));
            // Merge with filtered popular, deduplicate by name
            const merged = [...filteredPopular];
            results.forEach(r => {
                if (!merged.find(m => m.name.toLowerCase() === r.name.toLowerCase())) {
                    merged.push(r);
                }
            });
            setSuggestions(merged.slice(0, 8));
        } catch {
            setSuggestions(filteredPopular);
        } finally {
            setIsLoading(false);
        }
    }, [filteredPopular]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        setIsOpen(true);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (val.length < 2) {
            setSuggestions(POPULAR_PLACES.slice(0, 8));
            return;
        }
        setSuggestions(filteredPopular);
        debounceRef.current = setTimeout(() => searchNominatim(val), 500);
    };

    const handleSelect = (item: SuggestionResult) => {
        setQuery(item.name);
        setSelectedAddress(item.address);
        setPosition([item.lat, item.lng]);
        setSuggestions([]);
        setIsOpen(false);
        onLocationSelect({ lat: item.lat, lng: item.lng, address: item.address });
    };

    const handleClear = () => {
        setQuery('');
        setSelectedAddress('');
        setPosition(null);
        setSuggestions(POPULAR_PLACES.slice(0, 8));
        onLocationSelect({ lat: 0, lng: 0, address: '' });
        inputRef.current?.focus();
        setIsOpen(true);
    };

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', flexGrow: 1 }}>

            {/* Search bar */}
            <div ref={wrapperRef} style={{ position: 'relative', zIndex: 1000 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: isOpen ? '2px solid var(--accent)' : '2px solid rgba(128,128,128,0.25)',
                    background: 'var(--bg-color)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: isOpen ? '0 0 0 4px rgba(var(--accent-rgb, 34,197,94), 0.12)' : 'none',
                }}>
                    {isLoading
                        ? <Loader2 size={18} style={{ color: 'var(--accent)', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
                        : <Search size={18} style={{ color: 'var(--text-muted, #888)', flexShrink: 0 }} />
                    }
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => { setIsOpen(true); if (!query) setSuggestions(POPULAR_PLACES.slice(0, 8)); }}
                        placeholder={placeholder || 'Search hotel, station, or landmark...'}
                        autoComplete="off"
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            color: 'var(--text-main)',
                            fontSize: '0.95rem',
                            fontFamily: 'inherit',
                        }}
                    />
                    {query && (
                        <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #888)', display: 'flex', padding: 0 }}>
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Dropdown suggestions */}
                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        right: 0,
                        background: 'var(--bg-color)',
                        border: '1.5px solid rgba(128,128,128,0.18)',
                        borderRadius: '14px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                        overflow: 'hidden',
                        zIndex: 9999,
                        maxHeight: '280px',
                        overflowY: 'auto',
                    }}>
                        {!query && (
                            <div style={{
                                padding: '8px 14px 4px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted, #888)',
                                borderBottom: '1px solid rgba(128,128,128,0.1)',
                            }}>
                                Popular Pickup Points
                            </div>
                        )}
                        {(query ? suggestions : POPULAR_PLACES.slice(0, 8)).map((item, idx) => (
                            <div
                                key={idx}
                                onMouseDown={() => handleSelect(item)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                    padding: '10px 14px',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s',
                                    borderBottom: '1px solid rgba(128,128,128,0.07)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(128,128,128,0.07)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                <MapPin size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.3 }}>{item.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted, #888)', lineHeight: 1.4, marginTop: '2px' }}>
                                        {item.address.length > 55 ? item.address.slice(0, 55) + '…' : item.address}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {query && suggestions.length === 0 && !isLoading && (
                            <div style={{ padding: '16px 14px', color: 'var(--text-muted, #888)', fontSize: '0.88rem', textAlign: 'center' }}>
                                No results found. Try a different name.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Selected location badge */}
            {selectedAddress && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                }}>
                    <Navigation size={13} style={{ color: '#22c55e', flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedAddress}
                    </span>
                </div>
            )}

            {/* Map */}
            <div style={{
                flexGrow: 1,
                minHeight: '200px',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1.5px solid rgba(128,128,128,0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
                <MapContainer
                    center={position || [11.4102, 76.6950]}
                    zoom={position ? 13 : 9}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                    />
                    <MapUpdater position={position} />
                    {position && <Marker position={position} />}
                </MapContainer>
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
