import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("staff"); // default role

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-lg w-[350px]">
        <h1 className="text-2xl font-bold text-center mb-5">Create Account</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-3 text-green-700">{msg}</p>

        <Link to="/login" className="block text-center mt-4 text-blue-600">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
