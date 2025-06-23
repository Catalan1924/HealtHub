import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (!current) return navigate("/");
    setUser(current);
    setPreview(current.profilePic || "");
  }, [navigate]);

  const handleBack = () => {
    if (user?.role === "patient") {
      navigate("/patient");
    } else if (user?.role === "doctor") {
      navigate("/doctor/profile");
    } else if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    if (newPassword.trim() !== "") {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.username === user.username ? { ...u, password: newPassword } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      user.password = newPassword;
      setNewPassword("");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      setUser({ ...user, profilePic: img });
      setPreview(img);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.username === user.username ? user : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-4 relative">
      
      <button
        onClick={handleBack}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center text-700">My Profile</h2>

      <div className="flex justify-center">
        <img
          src={preview || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>
      <input type="file" onChange={handlePhotoUpload} className="block w-full" />
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
        placeholder="Username"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="New Password"
      />
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handlePasswordChange}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
        >
          Change Password
        </button>

        <button
          onClick={handleSaveChanges}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
        >
          Save Profile Changes
        </button>

        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;