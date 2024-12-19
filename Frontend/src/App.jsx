import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Pages/AuthDetails/Register";
import Login from "./Pages/AuthDetails/Login";
import CourseDetails from "./Pages/AuthDetails/CourseDetails";
import ProfileDisplay from "./Pages/Profile/ProfileDisplay";
import Homepage from "./Pages/Dashboard/Homepage";
import Assignments from "./Pages/Assignments/Assignments"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileDisplay />} />
          <Route path="/assignments" element={<Assignments />} />

          {/* test routes */}
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
