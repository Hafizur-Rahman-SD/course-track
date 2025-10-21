import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="home-wrap">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Track every course <br /> in one place ✨
          </h1>
          <p className="hero-text">
            Save your progress, add certificates, and never lose track of what you’ve learned.
            <br />
            <span className="highlight">
              For better experience, please create an account first.
            </span>
          </p>

          <div className="hero-buttons">
            <Button
              variant="contained"
              className="hero-btn primary"
              component={Link}
              to="/signup"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              className="hero-btn secondary"
              component={Link}
              to="/dashboard"
            >
              Live Demo
            </Button>
          </div>
        </div>

        <div className="hero-illustration">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/online-course-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--study-student-learning-education-pack-illustrations-4992832.png"
            alt="Course illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose CourseTrack?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎯 Stay Organized</h3>
            <p>All your courses, notes, and certificates in one dashboard.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Learn Smart</h3>
            <p>Visualize your progress and set learning goals easily.</p>
          </div>
          <div className="feature-card">
            <h3>☁️ Access Anywhere</h3>
            <p>Multi-device sync lets you continue learning on the go.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>© 2025 CourseTrack — All Rights Reserved.</p>
      </footer>
    </div>
  );
}
