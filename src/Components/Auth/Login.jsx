import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    // Check for Admin first
    if (username === "Admin" && password === "AdminDashboard") {
      const adminUser = { name: "Admin", role: "admin" };
      setLoggedUser(adminUser);
      localStorage.setItem("loggedUser", JSON.stringify(adminUser));
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      navigate("/admin");
      return;
    }

   
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setLoggedUser(currentUser);
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      localStorage.setItem("currentUser", JSON.stringify(foundUser));


      if (foundUser.role === "patient") {
        navigate("/patient");
      } else if (foundUser.role === "doctor") {
        navigate("/doctor");
      } else {
        setMessage("Unknown role");
      }
    } else {
      setMessage("Wrong credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
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

        <button
          type="submit"
          className="w-full justify-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
        
        {message && (
          <p className="text-red-500 text-sm mb-3">{message}</p>
        )}
        <p>Don't have an account?<a href="/signup" className="text-red-500"> Signup</a></p>

      </form>


    </div>
  );
};

export default Login;