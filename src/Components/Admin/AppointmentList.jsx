// Same imports
import { useState, useEffect } from "react";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({
    service: "",
    day: "",
    time: "",
    doctor: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filtered = appointments.filter((entry) => {
    const matchesService = filters.service
      ? entry.service?.toLowerCase().includes(filters.service.toLowerCase())
      : true;
    const matchesDay = filters.day
      ? entry.day?.toLowerCase().includes(filters.day.toLowerCase())
      : true;
    const matchesTime = filters.time
      ? entry.time?.toLowerCase().includes(filters.time.toLowerCase())
      : true;
    const matchesDoctor = filters.doctor
      ? entry.doctor?.toLowerCase().includes(filters.doctor.toLowerCase())
      : true;

    return matchesService && matchesDay && matchesTime && matchesDoctor;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-4">

      <h2 className="text-xl font-bold mb-4 text-blue-700">Appointment Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input type="text" placeholder="Filter by Service" name="service" value={filters.service} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Filter by Day" name="day" value={filters.day} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Filter by Time" name="time" value={filters.time} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Filter by Doctor" name="doctor" value={filters.doctor} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 text-left">Service</th>
              <th className="py-2 px-4 text-left">Day</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-2 text-center">{item.service}</td>
                <td className="py-2 px-2 text-center">{item.day}</td>
                <td className="py-2 px-2 text-center">{item.time}</td>
                <td className="py-2 px-2 text-center">{item.doctor}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No matching appointment entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Print Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentList;