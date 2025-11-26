// src/pages/Orders.jsx
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { money } from "../utils/money";
import QRCode from "react-qr-code";
import { socket } from "../socket";
import { API_URL } from "../services/api";

export default function Orders() {
  const { orderItems, updateQty, removeItem, clearCart, addToCart } = useCart();

  const [cashGiven, setCashGiven] = useState("");
  const [showQR, setShowQR] = useState(false);

  const total = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const change = Number(cashGiven || 0) - total;

  // ✅ Auto receive scanned items from phone
  useEffect(() => {
    socket.on("cart:add", (product) => {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty: 1,
      });

      setShowQR(false);
    });

    return () => socket.off("cart:add");
  }, []);

  // ✅ SAVE ORDER TO BACKEND (RENDER)
  const submitOrder = async () => {
    if (orderItems.length === 0) return alert("No items!");

    const payload = {
      staffName: JSON.parse(localStorage.getItem("pos-user")).name,
      items: orderItems,
      total,
      cashGiven: Number(cashGiven),
      change,
    };

    const res = await fetch(`${API_URL}/api/orders/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order success!");
      clearCart();
      setCashGiven("");
    } else {
      alert("Order failed");
    }
  };

  return (
    <div>
      {/* TITLE + SCAN BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <button
          onClick={() => setShowQR(true)}
          className="px-3 py-1 bg-blue-600 text-white rounded transform 
                      transition-transform duration-300 
                      hover:scale-95 ease 
                      active:scale-90 "
        >
          Scan Items 📷
        </button>
      </div>

      {/* ✅ QR CODE POPUP */}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow text-center">
            <h3 className="text-lg font-bold mb-2">Scan with Phone</h3>

            <QRCode
              value="https://my-project-vppx.onrender.com/mobile-order-scan"
              size={160}
            />

            <button
              onClick={() => setShowQR(false)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="p-2 text-left">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Total</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{money(item.price)}</td>
              <td className="p-2">
                <input
                  type="number"
                  className="border p-1 w-20"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.id, Number(e.target.value) || 1)
                  }
                />
              </td>
              <td className="p-2">{money(item.price * item.qty)}</td>
              <td className="p-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <div className="mb-3 font-bold text-lg">Total: {money(total)}</div>

      {/* CASH INPUT */}
      <div className="mb-2">
        <input
          placeholder="Cash given (៛)"
          className="border p-2"
          value={cashGiven}
          onChange={(e) => setCashGiven(e.target.value)}
        />
      </div>

      {/* CHANGE */}
      <div className="mb-4 text-green-700 font-bold">
        Change: {money(change)}
      </div>

      <button
        onClick={submitOrder}
        className="px-4 py-2 bg-green-600 text-white rounded transform 
                    transition-transform duration-300 
                    hover:scale-95 ease 
                    active:scale-90 "
      >
        Submit Order
      </button>
    </div>
  );
}
