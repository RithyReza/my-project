// src/components/PhoneScanner.jsx
import { QrReader } from "react-qr-reader";
import { useState } from "react";
import { API_URL } from "../services/api";

export default function PhoneScanner() {
  const [scanned, setScanned] = useState(false);

  const beep = () => {
    const audio = new Audio("/beep.mp3");
    audio.play();
  };

  const handleDetected = async (result) => {
    if (!result || scanned) return;

    setScanned(true);
    beep(); // ✅ play sound

    const code = result?.text;

    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    alert("✅ Product sent!");
    window.close();
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

      <button
        onClick={() => history.back()}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
