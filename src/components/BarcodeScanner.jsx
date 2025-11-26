import { useEffect } from "react";
import Quagga from "quagga";

export default function BarcodeScanner({ onDetected, onClose }) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: { facingMode: "environment" },
          target: document.querySelector("#scanner"),
        },
        decoder: { readers: ["ean_reader", "code_128_reader", "upc_reader"] },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    let cooldown = false;

    Quagga.onDetected((data) => {
      if (cooldown) return; // ✅ ignore duplicate frames

      cooldown = true;

      const code = data.codeResult.code;
      onDetected(code);

      setTimeout(() => {
        cooldown = false;   // ✅ allow scanning again after 1s
      }, 1000);
    });

    return () => {
      try {
        Quagga.stop();
      } catch (e) {}
      Quagga.offDetected();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Scan barcode</h3>
        <div id="scanner" style={{ width: 320, height: 240 }} />

        <div className="mt-3 flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
