import { useEffect, useRef } from "react";

export default function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const canvas = document.createElement("canvas");
  const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

  useEffect(() => {
    let stream;
    let interval;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        interval = setInterval(scan, 300);
      } catch (e) {
        alert("Camera blocked");
        onClose();
      }
    };

    const scan = () => {
      if (!("BarcodeDetector" in window)) return;

      const detector = new BarcodeDetector({
        formats: ["qr_code", "code_128", "ean_8", "ean_13"]
      });

      const ctx = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);

      detector.detect(canvas)
        .then(results => {
          if (results.length > 0) {
            beep.play();
            onDetected(results[0].rawValue);
            stop();
          }
        });
    };

    const stop = () => {
      clearInterval(interval);
      stream?.getTracks().forEach(t => t.stop());
    };

    start();
    return stop;
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
      <video ref={videoRef} className="w-full h-full object-cover" />

      <div className="absolute border-4 border-green-400 w-64 h-64 rounded-lg"></div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
