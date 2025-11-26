import { useState, useRef } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const sound = useRef(new Audio("/beep.mp3"));
  const lastScan = useRef(0);

  const onDetected = async (code) => {
    const now = Date.now();

    // ✅ prevent double-read within 1 second
    if (now - lastScan.current < 1000) return;
    lastScan.current = now;

    sound.current.play();

    await fetch(`${API_URL}/api/mobile/add-to-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    // ✅ no window.close()
    // ✅ no stop scanning
  };

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center relative">

      <BarcodeScanner
        onDetected={onDetected}
        onClose={() => history.back()}
      />

      <button
        onClick={() => history.back()}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
