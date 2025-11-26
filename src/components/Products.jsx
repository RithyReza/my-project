import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { money } from "../utils/money";
import { API_URL } from "../services/api";

import {
  getProducts,
  deleteProduct,
  editProduct,
} from "../services/ProductService";

export default function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "Other",
    img: null,
  });

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openEdit = (p) => {
    setEditing(p);
    setEditData({
      name: p.name,
      price: p.price,
      category: p.category,
      img: null,
    });
  };

  const saveEdit = async () => {
    const form = new FormData();
    form.append("name", editData.name);
    form.append("price", editData.price);
    form.append("category", editData.category);

    if (editData.img) form.append("img", editData.img);

    const res = await editProduct(editing._id, form);

    if (res.success) {
      alert("Updated!");
      setEditing(null);
      loadProducts();
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
        Products
      </h1>

      {/* Search + filter */}
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Drinks</option>
          <option>Snacks</option>
          <option>Foods</option>
          <option>Other</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="p-4 rounded shadow border"
            style={{ background: "var(--card)" }}
          >

            {/* ✅ FIXED IMAGE URL */}
            <img
              src={`${API_URL}${p.img}`}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="font-semibold mt-3">{p.name}</h2>

            <p className="text-lg font-bold">{money(p.price)}</p>

            <p className="opacity-60">{p.category}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() =>
                  addToCart({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    img: `${API_URL}${p.img}`, // ✅ FIX
                    qty: 1,
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>

              <button
                onClick={async () => {
                  if (confirm("Delete this product?")) {
                    await deleteProduct(p._id);
                    loadProducts();
                  }
                }}
                className="px-2 py-2 bg-transparent border text-white rounded"
              >
                Delete
              </button>
            </div>

            <button
              onClick={() => openEdit(p)}
              className="mt-2 w-full bg-orange-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <h2 className="text-xl font-bold mb-3">Edit Product</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />

            <input
              type="number"
              className="border p-2 w-full mb-2"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-2"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            >
              <option>Drinks</option>
              <option>Snacks</option>
              <option>Foods</option>
              <option>Other</option>
            </select>

            <input
              type="file"
              className="border p-2 w-full mb-3"
              onChange={(e) =>
                setEditData({ ...editData, img: e.target.files[0] })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
