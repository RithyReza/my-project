import QRCode from "react-qr-code";

export default function GenerateQR({ url, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-xl font-bold mb-3">Scan with your phone</h2>

        <QRCode value={url} size={230} />

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
