import { useState } from "react";

const BookAppointment = () => {
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push({
      ...form,
      patient: JSON.parse(localStorage.getItem("currentUser")).username,
    });
    localStorage.setItem("appointments", JSON.stringify(appointments));
    setMessage("Appointment booked!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Book Appointment</h2>
        <input
          type="text"
          name="doctor"
          placeholder="Doctor's Name"
          onChange={handleChange}
          required
          className="w-full border mb-3 px-3 py-2 rounded"
        />
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
          type="text"
          name="reason"
          placeholder="Reason for visit"
          onChange={handleChange}
          className="w-full border mb-3 px-3 py-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2  padding-10 rounded hover:bg-green-700">
          Book
        </button>
      <button type="button" className="w-full bg-green-600 text-white py-2 rounded hover:bg-red-700">
          Cancel
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default BookAppointment;