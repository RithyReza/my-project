import { useState } from "react";
import QRCode from "react-qr-code";

export default function UploadProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Drinks");
  const [img, setImg] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const PHONE_URL = "http://192.168.1.51:5173/mobile-upload";

  const handleUpload = async () => {
    if (!name || !price) return alert("name and price required");

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("category", category);
    form.append("barcode", barcode);
    if (img) form.append("img", img);

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);

    // ================================
    // 🚨 DUPLICATE BARCODE DETECTED
    // ================================
    if (data.duplicate) {
      const exists = data.product;

      if (
        confirm(
          `⚠ This barcode already exists!\n\nProduct: ${exists.name}\nPrice: ${exists.price}៛\n\nDo you want to EDIT this product instead?`
        )
      ) {
        // redirect to product page so user can edit
        window.location.href = `/products?edit=${exists._id}`;
      }
      return;
    }

    // ================================
    // SUCCESS UPLOAD
    // ================================
    if (data.success) {
      alert("Product added!");

      setName("");
      setPrice("");
      setCategory("Drinks");
      setBarcode("");
      setImg(null);
    } else {
      alert("Failed: " + data.error);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER + QR BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Upload Product</h1>

        <button
          onClick={() => setShowQR(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 "
        >
          📱 Phone Upload
        </button>
      </div>

      {/* BARCODE */}
      <div className="mb-2">
        <label>Barcode</label>
        <input
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* NAME */}
      <div className="mb-2">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* PRICE */}
      <div className="mb-2">
        <label>Price (៛)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* CATEGORY */}
      <div className="mb-2">
        <label>Category</label>
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Drinks</option>
          <option>Snacks</option>
          <option>Foods</option>
          <option>Other</option>
        </select>
      </div>

      {/* IMAGE */}
      <div className="mb-2">
        <label>Photo</label>
        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 "
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow text-center">
            <h2 className="text-xl font-bold mb-3">Scan to Upload on Phone</h2>

            <QRCode value={PHONE_URL} size={180} />

            <button
              onClick={() => setShowQR(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
