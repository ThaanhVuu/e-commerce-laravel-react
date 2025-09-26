import { useEffect, useState } from "react";
import { OrderService } from "../../services/AllService";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export function ManagerDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await OrderService.getStats();
                setStats(res.data);
            } catch (err) {
                console.error("Fetch stats error:", err);
            }
        })();
    }, []);

    if (!stats) return <p>Loading...</p>;

    const COLORS = ["#ffbb33", "#33b5e5", "#ff4444", "#00C851", "#888888"];

    const chartData = [
        { name: "Pending", value: stats.pending },
        { name: "Confirmed", value: stats.confirmed },
        { name: "Shipped", value: stats.shipped },
        { name: "Completed", value: stats.completed },
        { name: "Cancelled", value: stats.cancelled },
    ];

    return (
        <div className="container mt-4" style={{ height: "660px", overflowY: "auto" }}>
            <h3 className="fw-bold">📊 Manager Dashboard</h3>

            {/* KPI Cards */}
            <div className="row my-3">
                {/* Revenue */}
                <div className="col-md-4 mb-3">
                    <div className="card text-bg-success shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">💰 Doanh thu tháng</h5>
                            <h3>{Number(stats.total_revenue).toLocaleString()} đ</h3>
                        </div>
                    </div>
                </div>

                {/* Total Products */}
                <div className="col-md-4 mb-3">
                    <div className="card text-bg-dark shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">📦 Tổng số sản phẩm</h5>
                            <h3>{stats.total_products}</h3>
                        </div>
                    </div>
                </div>

                {/* Low Stock Products */}
                <div className="col-md-4 mb-3">
                    <div className="card text-bg-danger shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">⚠️ Sản phẩm sắp hết</h5>
                            <h3>{stats.low_stock_products.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders by status */}
            <div className="row my-3">
                <div className="col-md-3 mb-3">
                    <div className="card text-bg-warning shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6>Pending</h6>
                            <h4>{stats.pending}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-info shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6>Confirmed</h6>
                            <h4>{stats.confirmed}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-primary shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6>Shipped</h6>
                            <h4>{stats.shipped}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-success shadow-sm h-100">
                        <div className="card-body text-center">
                            <h6>Completed</h6>
                            <h4>{stats.completed}</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="row my-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="fw-bold">Phân bố trạng thái đơn hàng</h6>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="fw-bold">So sánh số lượng đơn hàng</h6>
                            <BarChart width={400} height={300} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#007bff" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>

            {/* Low Stock Products Table */}
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold text-danger">
                                ⚠️ Danh sách sản phẩm sắp hết (stock &lt; 10)
                            </h6>
                            {stats.low_stock_products.length > 0 ? (
                                <table className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Tồn kho</th>
                                        <th>Giá</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {stats.low_stock_products.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.id.slice(-6)}</td>
                                            <td>{p.name}</td>
                                            <td
                                                className={
                                                    p.stock < 5 ? "text-danger fw-bold" : ""
                                                }
                                            >
                                                {p.stock}
                                            </td>
                                            <td>{Number(p.price).toLocaleString()} đ</td>
                                            <td>{p.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-success">
                                    ✅ Không có sản phẩm nào sắp hết.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
