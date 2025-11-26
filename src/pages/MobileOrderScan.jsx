import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const [scanned, setScanned] = useState(false);

  const beep = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
    );
    audio.play();
  };

  const handleDetected = async (result) => {
    if (!result || scanned) return;

    setScanned(true);
    beep();

    const code = result?.text;

    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    alert("✅ Sent to POS!");
    history.back();
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">

      <QrReader
        onResult={handleDetected}
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "100vw", height: "100vh" }}
      />

      <div className="absolute border-4 border-white/70 w-64 h-64 rounded pointer-events-none"></div>

      <button
        onClick={() => history.back()}
        className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
