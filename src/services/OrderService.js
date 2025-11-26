import { API_URL } from "./api";

export async function saveOrder(products, total) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/orders/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify({ products, total }),
  });

  return res.json();
}

export async function getOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    },
  });

  return res.json();
}
