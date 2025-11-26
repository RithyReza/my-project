import { useEffect } from "react";
import Quagga from "quagga";

export default function BarcodeScanner({ onDetected, onClose }) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          target: document.querySelector("#scanner")
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_128_reader",
            "upc_reader"
          ]
        },
        locate: true
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      onDetected(code);
      Quagga.stop();
    });

    return () => {
      try {
        Quagga.stop();
      } catch {}
      Quagga.offDetected();
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div id="scanner" className="w-full h-full"></div>

      {/* ✅ CLOSE BUTTON WORKS NOW */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded text-white z-[100]"
      >
        Close
      </button>

      {/* ✅ SCAN BOX */}
      <div className="absolute border-4 border-white/80 w-64 h-64 rounded-lg pointer-events-none"></div>
    </div>
  );
}
