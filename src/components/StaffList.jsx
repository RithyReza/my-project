import { useEffect, useState } from "react";

export default function StaffList() {
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    const res = await fetch("http://localhost:5000/api/staff/list");
    const data = await res.json();
    if (data.success) setStaff(data.staff);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const deleteStaff = async (id) => {
    if (!confirm("Delete staff?")) return;

    await fetch(`http://localhost:5000/api/staff/delete/${id}`, {
      method: "DELETE",
    });

    fetchStaff();
  };

  return (
    <div className="p-4" style={{ color: "var(--text)" }}>
      <h1 className="text-2xl font-bold mb-4">Staff Members</h1>

      <div className="p-4 rounded shadow" style={{ background: "var(--card)" }}>
        {staff.length === 0 ? (
          <p>No staff found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s._id}>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteStaff(s._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
