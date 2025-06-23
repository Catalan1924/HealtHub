import { useState, useEffect } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    service: "",
    day: "",
    time: "",
    doctor: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const onlyDoctors = users.filter((u) => u.role === "doctor");
    setDoctors(onlyDoctors);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    const updated = [...existing, form];
    localStorage.setItem("appointments", JSON.stringify(updated));
    alert("Appointment added!");
    setForm({
      service: "",
      day: "",
      time: "",
      doctor: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Add Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Updated Service Field */}
  <select
    name="service"
    required
    value={form.service}
    onChange={handleChange}
    className="border p-2 rounded"
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
    type="text"
    name="day"
    placeholder="Day (e.g. Monday)"
    required
    value={form.day}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="time"
    placeholder="Time (e.g. 8:00AM - 10:00AM)"
    required
    value={form.time}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="unit"
    placeholder="Unit Name"
    required
    value={form.unit}
    onChange={handleChange}
    className="border p-2 rounded"
  />

  {/* Doctor Dropdown */}
  <select
    name="doctor"
    required
    value={form.doctor}
    onChange={handleChange}
    className="border p-2 rounded"
  >
    <option value="">Select Doctor</option>
    {doctor.map((d, i) => (
      <option key={i} value={d.username}>
        {d.username}
      </option>
    ))}
  </select>
  <input
    type="text"
    name="time"
    placeholder="Time (e.g. 8:00AM - 10:00AM)"
    required
    value={form.time}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="unit"
    placeholder="Unit Name"
    required
    value={form.unit}
    onChange={handleChange}
    className="border p-2 rounded"
  />

  {/* Doctor Dropdown */}
  <select
    name="doctor"
    required
    value={form.doctor}
    onChange={handleChange}
    className="border p-2 rounded"
  >
    <option value="">Assign Doctor</option>
    {doctors.map((d, i) => (
      <option key={i} value={d.username}>
        {d.username}
      </option>
    ))}
  </select>
</div>


        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;