import { useEffect, useState } from "react";
import { getOrders } from "../services/OrderService";

export default function Review() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getOrders();
      if (data.success) setOrders(data.orders || []);
      else console.error("failed to load orders", data);
    })();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Order Review</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{String(o.id).slice(-6)}</td>
                <td className="p-3">{new Date(o.date).toLocaleString()}</td>
                <td className="p-3">{o.itemCount}</td>
                <td className="p-3">${o.total.toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={()=>setOpenId(openId === o.id ? null : o.id)} className="px-3 py-1 bg-blue-500 text-white rounded">
                    {openId === o.id ? "Hide" : "Details"}
                  </button>
                </td>
                {openId === o.id && (
                  <tr><td colSpan={5} className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {o.items.map((it, idx) => (
                        <div key={idx} className="p-3 border rounded bg-white">
                          <img src={it.img ? `http://localhost:5000${it.img}` : "https://via.placeholder.com/150"} className="w-full h-28 object-cover rounded mb-2" />
                          <div className="font-semibold">{it.name}</div>
                          <div>Qty: {it.qty}</div>
                          <div>Price: ${it.price}</div>
                        </div>
                      ))}
                    </div>
                  </td></tr>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
