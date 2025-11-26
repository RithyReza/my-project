import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_URL } from "../services/api";
import beepSound from "../assets/beep.mp3";

export default function MobileOrderScan() {
  const [scanned, setScanned] = useState(false);

  const beep = new Audio(beepSound);

  const handleDetected = async (result) => {
    if (!result || scanned) return;

    setScanned(true);
    beep.play();

    const code = result?.text;

    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    alert("✅ Sent to POS!");
    window.close();
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative">

      {/* SCANNER */}
      <div className="w-full h-full">
        <QrReader
          onResult={handleDetected}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoContainerStyle={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* SCAN FRAME */}
      <div className="absolute border-4 border-white/80 w-64 h-64 rounded-lg pointer-events-none"></div>

      <p className="absolute bottom-10 text-lg opacity-80">
        Scanning… hold still
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
