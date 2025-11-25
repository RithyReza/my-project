import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";

export default function Login() {
  const [mode, setMode] = useState("staff");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    // ✅ STAFF LOGIN
    if (mode === "staff") {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/staff/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        });

        const data = await res.json();

        if (!data.success) return alert(data.message || "Login failed");

        login({
          name: data.user.name,
          role: "staff",
        });

        navigate("/");
        return;
      } catch (err) {
        console.error("Login error:", err);
        alert("Cannot connect to server");
        return;
      }
    }

    // ✅ ADMIN LOGIN
    if (mode === "admin") {
      if (password === "admin123") {
        login({
          name: "admin",
          role: "admin",
        });

        navigate("/");
      } else {
        alert("Invalid admin password");
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="p-10 w-full max-w-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div className="flex gap-3 mb-5 justify-center">
          <button
            onClick={() => setMode("staff")}
            className={`px-3 py-1 rounded ${
              mode === "staff"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Staff Login
          </button>

          <button
            onClick={() => setMode("admin")}
            className={`px-3 py-1 rounded ${
              mode === "admin"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Admin Login
          </button>
        </div>

        {mode === "staff" && (
          <>
            <h1 className="text-3xl mb-4">Staff Login</h1>
            <input
              placeholder="Name"
              className="border p-2 w-full mb-3 rounded hover:bg-amber-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="border p-2 w-full mb-3 rounded hover:bg-amber-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {mode === "admin" && (
          <>
            <h1 className="text-3xl mb-4">Admin Login</h1>
            <input
              placeholder="Admin Password"
              type="password"
              className="border p-2 w-full mb-3 rounded hover:bg-amber-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <button
          onClick={handleLogin}
          className="px-5 py-2 bg-green-600 text-white rounded 
                     transform transition-transform duration-300 
                     hover:scale-95 active:scale-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}
