import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Bloom</h1>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h2>Where Ideas Grow Beautifully 🌿</h2>
        <p>Create, collect, and organize your inspirations.</p>
        <button className="cta-btn">Start Blooming</button>
      </section>

      {/* Boards Grid */}
      <section className="boards">
        <div className="board">🌸 Floral Aesthetic</div>
        <div className="board">🌿 Nature Vibes</div>
        <div className="board">📚 Study Inspo</div>
        <div className="board">🏡 Cozy Homes</div>
        <div className="board">🎨 Art & Design</div>
        <div className="board">💚 Green Living</div>
      </section>
    </div>
  );
}

export default App;
