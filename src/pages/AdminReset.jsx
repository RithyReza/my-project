import { useState } from "react";

export default function AdminReset() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    const res = await fetch("http://localhost:5000/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, newPassword })
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Password Reset</h1>

      <input
        className="border p-2 mb-3 w-1/3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 mb-3 w-1/3"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-red-600 text-white px-5 py-2 rounded"
      >
        Reset Password
      </button>

      <p className="mt-3">{msg}</p>
    </div>
  );
}
