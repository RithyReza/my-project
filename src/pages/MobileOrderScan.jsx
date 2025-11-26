import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {
  const [scanned, setScanned] = useState(false);

  const handleDetected = async (result) => {
    if (!result || scanned) return;

    setScanned(true);

    const code = result?.text;

    // ✅ Send barcode to hosted backend
    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    alert("✅ Product sent to POS!");
    window.close();
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative">

      <div className="w-full h-full">
        <QrReader
          onResult={handleDetected}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoContainerStyle={{ width: "100%", height: "100%" }}
        />
      </div>

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
