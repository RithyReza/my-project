import { useEffect, useState } from "react";

export default function StaffManager() {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const loadStaff = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/staff/list`);
    const data = await res.json();
    setStaff(data.staff || []);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const addStaff = async () => {
    if (!name || !password) return alert("Fill all fields");

    const res = await fetch("http://localhost:5000/api/staff/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Staff added!");
      setName("");
      setPassword("");
      loadStaff();
    } else {
      alert("Error: " + data.error);
    }
  };

  const deleteStaff = async (id) => {
    if (!confirm("Delete staff?")) return;

    await fetch(`http://localhost:5000/api/staff/delete/${id}`, {
      method: "DELETE",
    });

    loadStaff();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Staff Manager</h2>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add Staff</h3>

        <input
          className="border p-2 mr-2 hover:bg-gray-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 mr-2 hover:bg-gray-400" 
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={addStaff} className="px-4 py-2 bg-green-600 text-white transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 ">
          Add Staff
        </button>
      </div>

      <div className="mt-5 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Existing Staff ({staff.length})</h3>

        {staff.map((s) => (
          <div key={s._id} className="flex justify-between border-b py-2">
            {s.name}
            <button
              onClick={() => deleteStaff(s._id)}
              className="px-3 py-1 bg-red-600 text-white rounded transform 
                            transition-transform duration-300 
                            hover:scale-95 ease 
                            active:scale-90 "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
