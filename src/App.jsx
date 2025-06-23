import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import DoctorDashboard from "./Components/Docter/DocterDashboard";
import PatientDashboard from "./Components/Student/PatientDashboard";
import Signup from "./Components/Auth/Signup"; 
import Profile from "./Components/Profile";
import BookAppointment from "./Components/Student/BookAppointment";
import DoctorAppointments from "./Components/Docter/DoctorAppointments";
import GridDistortion from "./Bits/GridDistortion";
import { div } from "three/tsl";
import Image from "./images.jpeg";
function App({loggedUser}) {
  
  
  
 return (
  <div className="relative min-h-screen">
    
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <GridDistortion
        imageSrc={Image}
        grid={10}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
        className="custom-class"
      />
    </div>

  
    <div className="relative z-10">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup currentUser={loggedUser} />} />
          <Route path="/admin" element={<AdminDashboard currentUser={loggedUser} />} />
          <Route path="/doctor" element={<DoctorDashboard currentUser={loggedUser} />} />
          <Route path="/patient" element={<PatientDashboard currentUser={loggedUser} />} />
          <Route path="/profile" element={<Profile currentUser={loggedUser} />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments currentUser={loggedUser} />} />
        </Routes>
      </Router>
    </div>
  </div>
);
}

export default App;