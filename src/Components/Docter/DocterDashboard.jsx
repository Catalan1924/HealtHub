import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGreetings from "../useGreetings";
import { Link } from "react-router-dom";


const DoctorDashboard = () => {
  const { greeting, holidayMessage } = useGreetings();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    service: "",
    day: "",
    time: "",

  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "doctor") {
      navigate("/doctor/login");
    } else {
      setCurrentUser(user);
      const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
      const myAppointments = allAppointments.filter(
        (appointment) => appointment.doctor === user.username
      );
      setAppointments(myAppointments);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      ...form,
      doctor: currentUser.username,
    };
    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments([...appointments, newAppointment]);

    setForm({
      service: "",
      day: "",
      time: "",
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="relative z-10 p-6 bg-white/80 backdrop-blur-sm min-h-screen rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          {greeting} {holidayMessage && ` - ${holidayMessage}`} {currentUser?.username}
        </h2>

        <div className="flex justify-end mb-4">
          <Link
            to="/profile"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
          >
            My Profile
          </Link>
        </div>

        <p className="mb-4">Here are your assigned appointments:</p>

        <div className="overflow-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Day</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Patient</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="border px-4 py-2 text-center">{item.service}</td>
                    <td className="border px-4 py-2 text-center">{item.day}</td>
                    <td className="border px-4 py-2 text-center">{item.time}</td>
                    <td className="border px-4 py-2 text-center">{item.patient}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No appointments assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-3">Add Appointment</h3>
          <form
            onSubmit={handleAddAppointment}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <select
              name="service"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            >
              <option value="">Select Service</option>
              <option value="General Checkup">General Checkup</option>
              <option value="Dental Consultation">Dental Consultation</option>
              <option value="Eye Examination">Eye Examination</option>
              <option value="Pediatric Consultation">Pediatric Consultation</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Radiology">Radiology</option>
              <option value="Urology">Urology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Oncology">Oncology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="ENT">ENT</option>
              <option value="Anesthesiology">Anesthesiology</option>
              <option value="Medicine & Surgery">Medicine & Surgery</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Physiotherapy">Physiotherapy</option>
            </select>

            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            />
            <input
              type="time"
              name="time"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            />
            <input
              name="patient"
              placeholder="Patient"
              value={form.patient || ""}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Appointment
              </button>
            </div>
          </form>
        </div>

       
      </div>
    </div>
  );
};

export default DoctorDashboard;