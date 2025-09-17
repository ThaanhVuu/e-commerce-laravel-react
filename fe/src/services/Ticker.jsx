// /src/components/Ticker.jsx
import {useEffect, useState} from "react";
import {GeolocationAPI} from "./Geolocation";

export function Ticker() {
    const [now, setNow] = useState(new Date());
    const [geo, setGeo] = useState(null);

    // cập nhật giờ mỗi giây
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // gọi API geolocation 1 lần
    useEffect(() => {
        (async () => {
            const data = await GeolocationAPI();
            if (data) {
                setGeo(data);
            }
        })();
    }, []);

    // nếu API có timezone thì dùng, nếu không fallback Asia/Ho_Chi_Minh
    const tz = geo?.timezone?.name || "Asia/Ho_Chi_Minh";

    const fmt = new Intl.DateTimeFormat("vi-VN", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(now);
    return (
        <div>
            <div>
                <h6>📍 {geo
                    ? `${geo.city || ""}${geo.city && geo.country ? ", " : ""}${geo.country || ""}`
                    : "Detecting..."}
                    {geo?.flag?.svg && (
                        <img
                            src={geo.flag.svg}
                            alt={`${geo?.country} flag`}
                            width={20}
                            height={14}
                            className="ms-2"
                            style={{display: "inline-block", verticalAlign: "middle"}}
                            loading="lazy"
                            onError={(e) => {
                                // nếu SVG lỗi, chuyển sang PNG (API của bạn có sẵn link PNG)
                                if (geo?.flag?.png) {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = geo.flag.png;
                                }
                            }}
                        />
                    )}
                </h6>
                <h6>🕒 {fmt}</h6>
                <h6>🌐 IP: {geo?.ip_address || "-"}</h6>
            </div>
        </div>
    );
}
