import { useEffect, useState } from "react";

const DoctorAppointments = ({ currentUser }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    // Filter appointments for this doctor
    const doctorAppointments = allAppointments.filter(
      (a) => a.doctor === currentUser?.username
    );
    setAppointments(doctorAppointments);
  }, [currentUser]);

  const handleStatus = (index, status) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    // Find the appointment in the global list
    const globalIndex = allAppointments.findIndex(
      (a) =>
        a.doctor === appointments[index].doctor &&
        a.date === appointments[index].date &&
        a.time === appointments[index].time &&
        a.patient === appointments[index].patient
    );
    console.log(globalIndex);
    if (globalIndex !== -1) {
      allAppointments[globalIndex].status = status;
      localStorage.setItem("appointments", JSON.stringify(allAppointments));
      // Update local state
      setAppointments((prev) => {
        const updated = [...prev];
        updated[index].status = status;
        return updated;
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2">Patient</th>
              <th className="border px-2">Date</th>
              <th className="border px-2">Time</th>
              <th className="border px-2">Reason</th>
              <th className="border px-2">Status</th>
              <th className="border px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, idx) => (
              <tr key={idx}>
                <td className="border px-2">{a.patient}</td>
                <td className="border px-2">{a.date}</td>
                <td className="border px-2">{a.time}</td>
                <td className="border px-2">{a.reason}</td>
                <td className="border px-2">{a.status || "Pending"}</td>
                <td className="border px-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    disabled={a.status === "Approved"}
                    onClick={() => handleStatus(idx, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={a.status === "Declined"}
                    onClick={() => handleStatus(idx, "Declined")}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointments;