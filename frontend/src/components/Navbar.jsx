import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Navbar() {
  return (
    <header className="main-navbar">
      <div className="nav-brand">
        <span className="logo-icon">📘</span> CourseTrack
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
      </nav>
    </header>
  );
}
