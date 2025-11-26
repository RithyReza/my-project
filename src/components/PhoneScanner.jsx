import { useState } from "react";
import QrScanner from "react-qr-barcode-scanner";
import beepSound from "../assets/beep.mp3";

export default function PhoneScanner({ onDetected, onClose }) {
  const [delay] = useState(300);

  const beep = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center relative">

      <QrScanner
        delay={delay}
        onUpdate={(err, result) => {
          if (result) {
            beep();
            onDetected(result.text);
          }
        }}
        style={{ width: "100%", height: "100%" }}
      />

      <div className="absolute border-4 border-white/80 w-64 h-64 rounded-lg pointer-events-none"></div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded text-white"
      >
        Close
      </button>
    </div>
  );
}
