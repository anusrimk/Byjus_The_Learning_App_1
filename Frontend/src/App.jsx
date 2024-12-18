import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Pages/AuthDetails/Register";
import Login from "./Pages/AuthDetails/Login";
import CourseDetails from "./Pages/AuthDetails/CourseDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/home" element={<h1>Home</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/course" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />

          {/* test routes */}
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
