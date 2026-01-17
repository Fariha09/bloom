import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import BoardDetails from "./components/BoardDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/App.css";


function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#2E6F40", color: "#F5F5DC" }}>
        <Link to="/" style={{ marginRight: "15px", color: "#F5F5DC" }}>Home</Link>
        <Link to="/login" style={{ color: "#F5F5DC", marginRight: "15px" }}>Login</Link>
        <Link to="/register" style={{ color: "#F5F5DC" }}>Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
