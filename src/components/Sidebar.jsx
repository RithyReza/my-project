import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const baseStyle =
    "cursor-pointer p-3 rounded transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)]";

  const activeStyle =
    "bg-white/30 backdrop-blur-md text-black shadow-md border border-white/40";

  const hoverStyle = "hover:bg-white/20";

  return (
    <div
      className="w-60 shadow-md p-4 h-full"
      style={{ background: "var(--sidebar)", color: "var(--text)" }}
    >
      <nav className="flex flex-col gap-3">

        {/* EVERYONE */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Dashboard
        </NavLink>

        {/* STAFF ONLY */}
        {user?.role === "staff" && (
          <>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Upload Product
            </NavLink>
          </>
        )}

        {/* ADMIN ONLY */}
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/review"
              className={({ isActive }) =>
                `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Review
            </NavLink>

            <NavLink
              to="/staff"
              className={({ isActive }) =>
                `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Staff Manager
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
