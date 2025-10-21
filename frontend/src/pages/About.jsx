import React from "react";
import "../styles/About.css";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="about-wrapper">
      <Navbar />

      <section className="about-main">
        <h1>
          About <span>CourseTrack</span>
        </h1>
        <p className="subtitle">
          Helping learners organize, track, and celebrate their growth 🎓
        </p>

        <div className="about-content">
          <div className="about-text">
            <p>
              📘 <strong>Our Mission:</strong> CourseTrack was created to make your
              online learning journey effortless. From Coursera to Udemy, or your
              college LMS — you can manage all your courses in one unified space.
            </p>

            <p>
              💡 <strong>Our Vision:</strong> We believe learning should be joyful,
              not overwhelming. CourseTrack helps you stay consistent, record your
              achievements, and visualize how far you’ve come.
            </p>

            <p>
              🚀 <strong>What We Offer:</strong> A secure, cloud-synced dashboard
              where every learner can save course details, progress, and
              certificates, accessible from any device, anywhere.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/student-studying-online-illustration-download-in-svg-png-gif-file-formats--boy-education-training-e-learning-pack-people-illustrations-5285022.png"
              alt="Learning illustration"
            />
          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <h3>🎯 Stay Focused</h3>
            <p>Keep track of your progress with ease and clarity.</p>
          </div>
          <div className="highlight-card">
            <h3>📂 Organized</h3>
            <p>Save course notes, links, and certificates in one place.</p>
          </div>
          <div className="highlight-card">
            <h3>💻 Accessible</h3>
            <p>Access your learning dashboard anytime, from any device.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 CourseTrack — Empowering lifelong learners 💜</p>
      </footer>
    </div>
  );
}
