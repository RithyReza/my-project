import { API_URL } from "./api";

const API = `${API_URL}/api`;

export async function getProducts() {
  const res = await fetch(`${API}/products`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addProduct(formData) {
  const res = await fetch(`${API}/products/add`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API}/products/delete/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function editProduct(id, formData) {
  const res = await fetch(`${API}/products/edit/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
}
