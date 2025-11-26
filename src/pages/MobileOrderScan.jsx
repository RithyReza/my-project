import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const sound = new Audio("/beep.mp3");   // ✅ PUBLIC FILE

  const onDetected = async (code) => {
    sound.play();

    await fetch(`${API_URL}/api/mobile/add-to-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    // ✅ No window.close
    // ✅ No setScanned(true)

    // show small toast
    alert("✅ Sent to POS!");
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
