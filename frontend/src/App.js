import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Boards from "./pages/Boards";
import CreateBoard from "./pages/CreateBoard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/create-board" element={<CreateBoard />} />

      </Routes>
    </Router>
  );
}

export default App;
