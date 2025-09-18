import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function Geolocation({ center = { lat: 20.96686287743926 , lng: 105.76996387161246 }, zoom = 15 }) {
    useEffect(() => {
        if (!center) return; // tránh undefined
        const map = L.map('leaflet-map').setView([center.lat, center.lng], zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap",
        }).addTo(map);
        L.marker([center.lat, center.lng]).addTo(map);
        return () => map.remove();
    }, [center, zoom]);

    return (
        <div id="leaflet-map" style={{ width: "480px", height: "300px", borderRadius: 12 }} />
    );
}
