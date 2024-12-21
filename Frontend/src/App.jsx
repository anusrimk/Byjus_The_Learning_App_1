import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Pages/AuthDetails/Register";
import Login from "./Pages/AuthDetails/Login";
import CourseDetails from "./Pages/AuthDetails/CourseDetails";
import ProfileDisplay from "./Pages/Profile/ProfileDisplay";
import Homepage from "./Pages/Dashboard/Homepage";
import Assignments from "./Pages/Assignments/Assignments"
import Attempting from "./Pages/Assignments/Attempting";
import Results from "./Pages/Assignments/Results";
import Subscription from "./Pages/Subscription/Subscription";
import VideoLanding from "./Pages/VideoLectures/VideosLanding";
import VideoWatching from "./Pages/VideoLectures/VideosWatching";
import ChatRoom from "./Pages/ChatRoom/Chatroom";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileDisplay />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/assignments/:assignmentId" element={<Attempting />} />
          <Route path="/results" element={<Results />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/videolanding" element={<VideoLanding />} />
          {/* <Route path="/video/:videoId" element={<VideoWatching />} /> */}
          <Route path="/videowatching" element={<VideoWatching />} />
          <Route path="/chat" element={<ChatRoom />} />

          {/* test routes */}
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
