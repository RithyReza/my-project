import { useEffect, useState } from "react";
import { money } from "../utils/money";
import { API_URL } from "../services/api";

export default function Review() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [staff, setStaff] = useState("");
  const [orders, setOrders] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [openRow, setOpenRow] = useState(null);

  // Load staff options
  useEffect(() => {
    fetch(`${API_URL}/api/staff/list`)
      .then((r) => r.json())
      .then((d) => setStaffOptions(d.staff || []));
  }, []);

  // Load orders with filters
  const loadOrders = async () => {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (staff) params.append("staff", staff);

    const res = await fetch(`${API_URL}/api/orders?` + params.toString());
    const data = await res.json();

    if (data.success) setOrders(data.orders || []);
  };

  useEffect(() => {
    loadOrders();
  }, [date, staff]);

  const overall = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">📊 Staff Sales Review</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All staff</option>
          {staffOptions.map((s) => (
            <option key={s._id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          onClick={loadOrders}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reload
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Staff</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <>
                <tr key={o._id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{o.invoiceId}</td>
                  <td className="p-3">{o.staffName}</td>
                  <td className="p-3 font-semibold">{money(o.total)}</td>
                  <td className="p-3">{o.items.length}</td>
                  <td className="p-3">{new Date(o.date).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() =>
                        setOpenRow(openRow === o._id ? null : o._id)
                      }
                    >
                      {openRow === o._id ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>

                {openRow === o._id && (
                  <tr>
                    <td colSpan={6} className="bg-gray-100 p-4">
                      <h3 className="text-lg font-bold mb-3">Items</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {o.items.map((item, i) => (
                          <div key={i} className="p-3 bg-white rounded shadow border">
                            {item.img && (
                              <img
                                src={`${API_URL}${item.img}`}
                                className="w-full h-28 object-cover rounded"
                              />
                            )}

                            <h4 className="font-semibold mt-2">{item.name}</h4>
                            <p>Qty: {item.qty}</p>
                            <p>Price: {money(item.price)}</p>
                            <p className="font-bold">
                              Total: {money(item.price * item.qty)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <hr className="my-4" />

                      <div className="text-sm">
                        <p>💰 <strong>Total:</strong> {money(o.total)}</p>
                        <p>🪙 <strong>Cash Given:</strong> {money(o.cashGiven)}</p>
                        <p>🔄 <strong>Change:</strong> {money(o.cashGiven - o.total)}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-xl font-bold">
        🧮 Daily Total: <span className="text-green-700">{money(overall)}</span>
      </div>
    </div>
  );
}
