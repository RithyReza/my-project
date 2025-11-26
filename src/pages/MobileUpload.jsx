import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { API_URL } from "../services/api";

export default function MobileUpload() {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Drinks");
  const [img, setImg] = useState(null);

  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("");

  const onDetected = (code) => {
    setBarcode(code);
    setScanning(false);
    setMessage("Barcode detected ✔");
  };

  const handleUpload = async () => {
    if (!barcode) return alert("Scan barcode first!");
    if (!name || !price) return alert("Name and price required!");

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("category", category);
    form.append("barcode", barcode);
    if (img) form.append("img", img);

    // ✅ USE HOSTED BACKEND
    const res = await fetch(`${API_URL}/api/products/add`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.duplicate) {
      const exists = data.product;

      if (
        confirm(
          `⚠ This barcode already exists!\n\nProduct: ${exists.name}\nPrice: ${exists.price}៛\n\nOpen item for editing?`
        )
      ) {
        window.location.href = `/products?edit=${exists._id}`;
      }
      return;
    }

    if (data.success) {
      alert("Uploaded ✔");

      setName("");
      setPrice("");
      setCategory("Drinks");
      setImg(null);
      setBarcode("");
      setMessage("");
    } else {
      alert("Failed: " + data.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-3">📱 Mobile Product Upload</h1>

      <button
        onClick={() => setScanning(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-3"
      >
        📷 Scan Barcode
      </button>

      {message && <p className="text-green-700 mb-2">{message}</p>}

      {scanning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-3 rounded w-80 text-center">
            <h2 className="font-bold text-lg mb-2">Scan Barcode</h2>

            <BarcodeScanner
              onDetected={onDetected}
              onClose={() => setScanning(false)}
            />

            <button
              onClick={() => setScanning(false)}
              className="bg-red-500 text-white mt-3 px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mb-3">
        <label>Barcode</label>
        <input
          value={barcode}
          readOnly
          className="border p-2 w-full bg-gray-100"
        />
      </div>

      <div className="mb-3">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label>Price (៛)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Drinks</option>
          <option>Snacks</option>
          <option>Foods</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Photo</label>
        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Upload Product ✔
      </button>
    </div>
  );
}
