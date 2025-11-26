import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";

// STAFF pages
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Upload from "./components/Upload";

// ADMIN pages
import Review from "./components/Review";
import StaffManager from "./pages/StaffManager";

// Shared UI
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Mobile pages
import MobileUpload from "./pages/MobileUpload";
import MobileOrderScan from "./pages/MobileOrderScan";   // ✅ ADD THIS

import { useAuth } from "./context/AuthContext";

// ======================= LAYOUT ===========================
function Layout() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            {/* Everyone sees Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* STAFF ONLY */}
            {user?.role === "staff" && (
              <>
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/upload" element={<Upload />} />
              </>
            )}

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <>
                <Route path="/review" element={<Review />} />
                <Route path="/staff" element={<StaffManager />} />
              </>
            )}
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ======================= APP ROOT ===========================
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Mobile Upload */}
          <Route path="/mobile-upload" element={<MobileUpload />} />

          {/* ✅ Mobile Order Scanner */}
          <Route path="/mobile-order-scan" element={<MobileOrderScan />} />

          {/* ✅ Everything else */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
