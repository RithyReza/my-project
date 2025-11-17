import { useEffect, useState } from "react";

export default function StaffManage() {
  const [users, setUsers] = useState([]);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch("http://localhost:5000/api/admin/staff", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setUsers(data.users || []);
    else alert("Failed to load");
  };

  useEffect(()=> { load(); }, []);

  const create = async () => {
    if (!u || !p) return alert("fill inputs");
    const res = await fetch("http://localhost:5000/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username: u, password: p, role: "staff" }),
    });
    const data = await res.json();
    if (data.success) { setU(""); setP(""); load(); }
    else alert(data.message || "Create failed");
  };

  const reset = async (id) => {
    const temp = prompt("Enter new password:");
    if (!temp) return;
    const res = await fetch(`http://localhost:5000/api/admin/staff/${id}/reset`, {
      method: "PUT",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ newPassword: temp }),
    });
    const data = await res.json();
    if (data.success) alert("Password reset");
    else alert("Failed");
  };

  const del = async (id) => {
    if (!confirm("Delete user?")) return;
    const res = await fetch(`http://localhost:5000/api/admin/staff/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) load();
    else alert("Failed");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Staff Manager</h1>

      <div className="mb-4 p-4 bg-white rounded shadow">
        <h3 className="font-semibold">Create Staff</h3>
        <input className="border p-2 mr-2" value={u} onChange={e=>setU(e.target.value)} placeholder="username"/>
        <input className="border p-2 mr-2" value={p} onChange={e=>setP(e.target.value)} placeholder="password"/>
        <button onClick={create} className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">All Users</h3>
        <table className="w-full">
          <thead><tr><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u=>(
              <tr key={u._id}>
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button onClick={()=>reset(u._id)} className="px-2 py-1 mr-2 bg-yellow-400 rounded">Reset</button>
                  <button onClick={()=>del(u._id)} className="px-2 py-1 bg-red-500 rounded text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
