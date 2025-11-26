import PhoneScanner from "../components/PhoneScanner";
import { API_URL } from "../services/api";

export default function MobileOrderScan() {

  const handleDetected = async (code) => {
    await fetch(`${API_URL}/api/mobile/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: code }),
    });

    window.close();
  };

  return (
    <PhoneScanner
      onDetected={handleDetected}
      onClose={() => window.close()}
    />
  );
}
