export async function saveOrder(products, total) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/orders/save", {
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
  const res = await fetch("http://localhost:5000/api/orders", {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.json();
}

