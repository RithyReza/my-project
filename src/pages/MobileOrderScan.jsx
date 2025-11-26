import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const [scanned, setScanned] = useState(false);
  const sound = new Audio("/beep.mp3");   // ✅ PUBLIC FILE

  const onDetected = async (code) => {
    if (scanned) return;
    setScanned(true);

    sound.play();   // ✅ Works on phone + render

    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    alert("✅ Sent to POS!");
    window.close();
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
