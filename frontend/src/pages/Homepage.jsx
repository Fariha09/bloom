import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Homepage() {
  const token = localStorage.getItem("token");


  // ✅ STATE MUST BE HERE
  const [boards, setBoards] = useState([]);

  // ✅ EFFECT MUST BE HERE
  useEffect(() => {
    fetch("http://localhost:5000/api/boards")
      .then((res) => res.json())
      .then((data) => setBoards(data))
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Bloom</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/boards">Boards</Link>
          <Link to="/create-board">Create Board</Link>

          {token ? (
            <a
              href="/"
              onClick={() => {
                localStorage.removeItem("token");
                alert("Logged out 🌿");
              }}
            >
              Logout
            </a>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h2>Where Ideas Grow Beautifully 🌿</h2>
        <p>Create, collect, and organize your inspirations.</p>
        <button className="cta-btn">Start Blooming</button>
      </section>

      {/* Static Inspiration Boards */}
      <section className="boards">
        <div className="board static">🌸 Floral Aesthetic</div>
        <div className="board static">🌿 Nature Vibes</div>
        <div className="board static">📚 Study Inspo</div>
        <div className="board static">🏡 Cozy Homes</div>
        <div className="board static">🎨 Art & Design</div>
        <div className="board static">💚 Green Living</div>
      </section>

      {/* Dynamic Boards Preview */}
      <section className="boards">
        <h3 className="section-title">Your Boards 🌱</h3>

        {boards.length === 0 ? (
          <p>No boards yet 🌿</p>
        ) : (
          boards.map((board) => (
            <Link
              key={board._id}
              to={`/boards/${board._id}`}
              className="board"
            >
              {board.title}
            </Link>
          ))
        )}
      </section>
    </div>
  );
}

export default Homepage;
