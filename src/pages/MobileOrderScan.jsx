// src/pages/MobileOrderScan.jsx
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const [locked, setLocked] = useState(false);

  const beep = () => {
    const audio = new Audio(
      "https://www.soundjay.com/buttons/sounds/beep-07.mp3"
    );
    audio.play();
  };

  const handleDetected = async (result) => {
    if (!result || locked) return;

    setLocked(true);

    const barcode = result.text;
    beep();

    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode }),
    });

    // allow next scan after 1 sec
    setTimeout(() => setLocked(false), 1000);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative">

      {/* Scanner */}
      <div className="w-full h-full">
        <QrReader
          onResult={handleDetected}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoContainerStyle={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Scan Frame */}
      <div className="absolute border-4 border-green-400 w-64 h-64 rounded-lg pointer-events-none"></div>

      <p className="absolute bottom-10 text-lg opacity-80">
        Scan product barcode…
      </p>

      {/* Close */}
      <button
        onClick={() => window.close()}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded text-white"
      >
        Close
      </button>
    </div>
  );
}
