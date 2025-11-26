import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("Scanning…");

  const handleDetected = async (result) => {
    if (!result || locked) return;

    setLocked(true); // prevent double scan

    const barcode = result?.text;
    setMessage("Sending to POS…");

    try {
      await fetch(`${API_URL}/api/mobile/add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode }),
      });

      setMessage("✅ Added to POS!");
      navigator.vibrate?.(100); // phone vibrate

      // ✅ continue scanning automatically
      setTimeout(() => {
        setMessage("Scanning…");
        setLocked(false);
      }, 800);

    } catch (err) {
      setMessage("❌ Failed to send");
      setLocked(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative">

      <QrReader
        onResult={handleDetected}
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "100%", height: "100%" }}
        videoContainerStyle={{ width: "100%", height: "100%" }}
      />

      <div className="absolute border-4 border-white/80 w-64 h-64 rounded-lg pointer-events-none"></div>

      <p className="absolute bottom-10 text-lg opacity-80">
        {message}
      </p>

      <button
        onClick={() => history.back()}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded text-white"
      >
        Close
      </button>
    </div>
  );
}
