import { useState } from "react";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  /* ========================
     Handle Input Change
  ======================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* ========================
     Validate Form
  ======================== */
  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.idea.trim()) newErrors.idea = "Subject is required";
    if (!formData.description.trim()) newErrors.description = "Message cannot be empty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ========================
     Send Email
  ======================== */
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    setStatus("Sending...");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {

        setStatus("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          idea: "",
          description: ""
        });

      })
      .catch(() => {
        setStatus("Failed to send message.");
      });
  };

  return (

    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center md:justify-start px-6"
    >

      {/* Background Image (Desktop Only) */}
      <img
        src="/src/assets/contact.png"
        alt="contact background"
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay (Desktop Only) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Particles */}
      <ParticlesBackground />

      {/* Contact Form */}
      <div className="relative z-30 w-full max-w-xl mx-auto md:mx-0 md:ml-24">

        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center md:text-left">
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none"
          />
          {errors.name && <p className="text-red-400">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none"
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}

          <input
            type="text"
            name="idea"
            placeholder="Subject / Opportunity"
            value={formData.idea}
            onChange={handleChange}
            className="p-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none"
          />
          {errors.idea && <p className="text-red-400">{errors.idea}</p>}

          <textarea
            name="description"
            rows="5"
            placeholder="Your Message"
            value={formData.description}
            onChange={handleChange}
            className="p-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-400">{errors.description}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-green-400">{status}</p>
          )}

        </form>

      </div>

    </section>
  );
}