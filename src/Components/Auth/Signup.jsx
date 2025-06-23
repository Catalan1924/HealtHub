import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "patient",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.username === formData.username);
    if (exists) {
      setMessage("Username already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

   
    localStorage.setItem("currentUser", JSON.stringify(formData));

    
    setFormData({
      username: "",
      password: "",
      role: "patient",
      service: "",
    });

    setMessage("Account created successfully! Redirecting...");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border mb-3 px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border mb-3 px-3 py-2 rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border mb-3 px-3 py-2 rounded"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>


{/* If Doctor */}
{formData.role === "doctor" && (
  <select
    name="specialization"
    onChange={handleChange}
    required
    className="w-full border mb-3 px-3 py-2 rounded"
  >
    <option value="">Select Specialization</option>
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
)}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

        {message && (
          <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;