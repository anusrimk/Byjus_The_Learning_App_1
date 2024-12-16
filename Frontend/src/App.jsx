import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<Register />} />
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
