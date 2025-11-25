import { useState } from "react";
import { API_URL } from "../services/api";

export default function StaffAdd() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleAdd = async () => {
    if (!name || !password) return alert("Fill all fields");

    const res = await fetch(`${API_URL}/api/staff/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Staff created!");
      setName("");
      setPassword("");
    } else {
      alert("Failed: " + (data.message || data.error));
    }
  };

  return (
    <div className="p-4" style={{ color: "var(--text)" }}>
      <h1 className="text-2xl font-bold mb-4">Add Staff Member</h1>

      <div className="p-4 rounded shadow" style={{ background: "var(--card)" }}>
        <input
          className="border rounded p-2 w-full mb-3"
          placeholder="Staff Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          className="border rounded p-2 w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Staff
        </button>
      </div>
    </div>
  );
}
