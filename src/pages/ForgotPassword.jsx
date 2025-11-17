import { useState } from "react";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");

  const handleForgot = async () => {
    const res = await fetch("http://localhost:5000/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();
    setMsg(data.success ? `Temporary password: ${data.tempPassword}` : data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-lg w-[350px]">
        <h1 className="text-xl font-bold mb-5 text-center">Forgot Password</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleForgot}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Reset Password
        </button>

        <p className="text-center mt-4 text-blue-600">{msg}</p>
      </div>
    </div>
  );
}
