import { useEffect, useState } from "react";
import {UserService2} from "../../services/AllService";

export function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                // Giả sử API Laravel: GET /api/v1.0/users/stats
                const res = await UserService2.stats();
                setStats(res.data);
            } catch (err) {
                console.error("Fetch stats error:", err);
            }
        })();
    }, []);

    if (!stats) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-4">📊 Dashboard</h3>

            <div className="row g-3">
                {/* Tổng User */}
                <div className="col-md-3">
                    <div className="card text-bg-primary shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title">👥 Tổng User</h6>
                            <h3>{stats.total_user}</h3>
                        </div>
                    </div>
                </div>

                {/* Tổng ProfileUser */}
                <div className="col-md-3">
                    <div className="card text-bg-success shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title">📄 Tổng Profile</h6>
                            <h3>{stats.total_profile}</h3>
                        </div>
                    </div>
                </div>

                {/* Tổng Admin */}
                <div className="col-md-3">
                    <div className="card text-bg-warning shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title">🛡️ Tổng Admin</h6>
                            <h3>{stats.total_admin}</h3>
                        </div>
                    </div>
                </div>

                {/* Tổng Manager */}
                <div className="col-md-3">
                    <div className="card text-bg-dark shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title">📊 Tổng Manager</h6>
                            <h3>{stats.total_manager}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
