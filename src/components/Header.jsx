import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("app_theme") || "theme-purple");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cycleTheme = () => {
  const themes = [
    "theme-purple",
    "theme-blue",
    "theme-neon",
    "theme-coffee",
    "theme-khmer"
  ];

  const next = themes[(themes.indexOf(theme) + 1) % themes.length];
  setTheme(next);
};


  return (
    <header style={{ background: "var(--primary)", color: "var(--text)" }} className="flex justify-between p-4 items-center">
      <div>
        <h1 className="text-2xl font-bold">PosSystem</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link className="hidden md:inline hover:underline" to="/dashboard" style={{ color: "var(--card)" }}>Home</Link>
        <Link className="hidden md:inline hover:underline" to="/products" style={{ color: "var(--card)" }}>Products</Link>
        <Link className="hidden md:inline hover:underline" to="/orders" style={{ color: "var(--card)" }}>Orders</Link>

        <button
          onClick={cycleTheme}
          title="Switch theme"
          className="px-3 py-1 rounded shadow transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 "
          style={{
            background: "var(--card)",
            color: "var(--primary)",
            border: "1px solid rgba(0,0,0,0.06)"
          }}
        >
          Theme🎨
        </button>

        <button
          onClick={handleLogout}
          className="ml-2 bg-red-600 text-white px-3 py-1 rounded transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 ease"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
