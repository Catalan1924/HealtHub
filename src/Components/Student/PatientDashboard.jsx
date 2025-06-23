import { useState, useEffect } from "react";
import useGreetings from "../useGreetings";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const { greeting, holidayMessage } = useGreetings();
  const [appointments, setAppointments] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    service: "",

  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }

    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    const serviceAppointments = user
      ? data.filter((appointment) => appointment.service === user.service)
      : [];

    setAppointments(serviceAppointments);
  }, []);
  const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
const myAppointments = allAppointments.filter(
  (a) => a.patient === currentUser.username
);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-pink-100 z-0"></div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-md h-screen">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          {greeting} {holidayMessage && ` - ${holidayMessage}`} {currentUser.username}
        </h2>

        
        <div className="flex justify-end mb-4">
          <Link
            to="/profile"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
          >
            My Profile
          </Link>
        </div>



        <p className="mb-4 text-gray-600">
              Your appointments for <strong>{currentUser.service}</strong> are shown below:
        </p>

        
        <div className="overflow-auto">
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

       
        <div className="mt-4 text-right">
            <a href="/book-appointment" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Appointment</a>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;