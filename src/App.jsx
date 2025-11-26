import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";

// Mobile pages
import MobileUpload from "./pages/MobileUpload";
import MobileOrderScan from "./pages/MobileOrderScan";

// Layout pages
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Upload from "./components/Upload";
import Review from "./components/Review";
import StaffManager from "./pages/StaffManager";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import { useAuth } from "./context/AuthContext";

function Layout() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {user?.role === "staff" && (
              <>
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/upload" element={<Upload />} />
              </>
            )}

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ Standalone mobile pages */}
          <Route path="/mobile-upload" element={<MobileUpload />} />
          <Route path="/mobile-order-scan" element={<MobileOrderScan />} />

          {/* ✅ Everything else uses layout */}
          <Route path="/*" element={<Layout />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
