import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { money } from "../utils/money";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    weeklySales: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-3">Loading dashboard...</div>;

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb" style={{ color: "var(--text)" }}>
        Dashboard Overview
      </h2>

      {/* ==== TOP CARDS ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        {/* Total Sales */}
        <div
          className="p-4 rounded-lg shadow"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderLeft: "4px solid var(--primary)"
          }}
        >
          <div className="text-sm text-black">Total Sales</div>
          <div className="text-2xl font-bold">
            {money(stats.totalSales)}
          </div>
        </div>

        {/* Orders */}
        <div
          className="p-4 rounded-lg shadow"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderLeft: "4px solid var(--secondary)"
          }}
        >
          <div className="text-sm text-black">Orders</div>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
        </div>

        {/* Products Sold */}
        <div
          className="p-4 rounded-lg shadow"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderLeft: "4px solid var(--primary-dark)"
          }}
        >
          <div className="text-sm text-black">Products Sold</div>
          <div className="text-2xl font-bold">{stats.totalProductsSold}</div>
        </div>
      </div>

      {/* ==== WEEKLY SALES CHART ==== */}
      <div
        className="p-4 rounded-lg shadow"
        style={{ background: "var(--card)", color: "var(--text)" }}
      >
        <h3 className="font-semibold mb-3">Weekly Sales (៛)</h3>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={
              stats.weeklySales?.length
                ? stats.weeklySales
                : [
                    { day: "Mon", sales: 0 },
                    { day: "Tue", sales: 0 },
                    { day: "Wed", sales: 0 },
                    { day: "Thu", sales: 0 },
                    { day: "Fri", sales: 0 },
                    { day: "Sat", sales: 0 },
                    { day: "Sun", sales: 0 },
                  ]
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => money(value)} />
            <Line
              dataKey="sales"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
