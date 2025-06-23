import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import DoctorDashboard from "./Components/Docter/DocterDashboard";
import PatientDashboard from "./Components/Patient/PatientDashboard";
import Signup from "./Components/Auth/Signup"; 
import Profile from "./Components/Profile";
import BookAppointment from "./Components/Patient/BookAppointment";
import DoctorAppointments from "./Components/Docter/DoctorAppointments";
import GridDistortion from "./Bits/GridDistortion";
function App({loggedUser}) {
  
  
  
  return (
    
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login  />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signup" element={<Signup currentUser={loggedUser}  />} />
        <Route path="/admin" element={<AdminDashboard currentUser={loggedUser}  />} />
        <Route path="/doctor" element={<DoctorDashboard currentUser={loggedUser}  />} />
        <Route path="/patient" element={<PatientDashboard currentUser={loggedUser}  />} /> 
        <Route path="/profile" element={<Profile currentUser={loggedUser}  />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments currentUser={loggedUser} />} />
      </Routes>
    </Router>
  );
}

export default App;