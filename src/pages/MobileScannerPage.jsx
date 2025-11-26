import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { API_URL } from "../services/api";

export default function MobileScannerPage() {
  const [barcode, setBarcode] = useState("");
  const [openScanner, setOpenScanner] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("Other");

  const handleDetected = code => {
    setBarcode(code);
    setOpenScanner(false);
  };

  const submit = async () => {
    if (!name || !price) return alert("Fill name & price");

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("category", category);
    form.append("barcode", barcode);
    if (img) form.append("img", img);

    // ✅ Use hosted backend
    const res = await fetch(`${API_URL}/api/mobile/add-product`, {
      method: "POST",
      body: form
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Product added!");
      setName("");
      setPrice("");
      setImg(null);
      setBarcode("");
    } else {
      alert("❌ Error: " + (data.error || "unknown"));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-3">Mobile Scanner (Phone)</h1>

      {openScanner && (
        <BarcodeScanner
          onDetected={handleDetected}
          onClose={() => setOpenScanner(false)}
        />
      )}

      <div className="mb-3">
        <button
          onClick={() => setOpenScanner(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Open Scanner
        </button>
      </div>

      <div className="mb-3">
        <label className="block">Barcode</label>
        <input
          value={barcode}
          onChange={e => setBarcode(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label>Photo</label>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <button
          onClick={submit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit Product
        </button>
      </div>
    </div>
  );
}
