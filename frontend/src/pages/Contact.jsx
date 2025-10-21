import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient"; // ✅ এইটা যোগ করো

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("❌ Message failed: " + error.message);
    } else {
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setSent(true);
    }
  };

  return (
    <div className="contact-wrapper">
      <Navbar />
      <section className="contact-section">
        <h1>
          Get in <span>Touch</span>
        </h1>
        <p>We’d love to hear from you! Fill out the form below 👇</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {sent && <p className="success-msg">✅ Thanks for your message!</p>}

        <div className="contact-info">
          <p>📧 support@coursetrack.com</p>
          <p>📞 +880 1605 135 004</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 CourseTrack | Connect • Learn • Grow</p>
      </footer>
    </div>
  );
}
