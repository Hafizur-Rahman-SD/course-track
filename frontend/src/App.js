import * as React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/Home.css"; // ✅ তোমার CSS ইমপোর্ট
import SchoolIcon from "@mui/icons-material/School";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function App() {
  return (
    <div className="home-wrapper">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="home-hero">
        <div className="hero-left">
          <h1>
            Welcome to <span>CourseTrack</span> 🎓
          </h1>
          <p>
            Your all-in-one personal learning manager — track your courses,
            monitor progress, and stay consistent with your goals.
          </p>

          <div className="hero-buttons">
            <Button
              variant="contained"
              component={Link}
              to="/signup"
              className="btn-main"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/dashboard"
              className="btn-outline"
              startIcon={<TimelineIcon />}
            >
              Live Demo
            </Button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/elearning-dashboard-illustration-download-in-svg-png-gif-file-formats--online-courses-classroom-student-education-pack-people-illustrations-4289119.png"
            alt="CourseTrack Illustration"
          />
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="home-features">
        <h2>Why Choose CourseTrack?</h2>
        <div className="features-container">
          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4221/4221429.png"
              alt="Track Progress"
            />
            <h3>Track Progress</h3>
            <p>
              Keep track of your learning journey with an elegant, intuitive
              dashboard that grows with you.
            </p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4775/4775390.png"
              alt="Organize Data"
            />
            <h3>Organize Effortlessly</h3>
            <p>
              Store all your course links, notes, and certificates neatly in one
              place — accessible anytime.
            </p>
          </div>

          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png"
              alt="Grow Skills"
            />
            <h3>Grow Consistently</h3>
            <p>
              Visualize your improvement and make learning a part of your daily
              routine effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="home-footer">
        <p>© 2025 CourseTrack — Built to empower your growth 💜</p>
      </footer>
    </div>
  );
}
