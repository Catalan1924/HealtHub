import { useEffect, useState } from "react";
import Users from "./Users";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import { Link } from "react-router-dom";




const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  return (
 
 

    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>
      <div className="flex justify-end mb-4">
  <Link
    to="/profile"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
  >
    My Profile
  </Link>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Users & Timetable Form */}
        <div className="space-y-6">
          <Users users={users} />
          <AppointmentForm users={users} />
        </div>

        {/* Right Column: List of Appointments */}
        <div>
          <AppointmentList />
        </div>
       

      </div>
    </div>
   
  );
};

export default AdminDashboard;