// Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions or feedback? Reach out to us using the contact form or the info below.
            </p>

            <div className="flex items-center gap-3 text-gray-700">
              <i className="ri-phone-fill text-green-500 text-xl"></i>
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <i className="ri-mail-fill text-green-500 text-xl"></i>
              <span>info@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <i className="ri-map-pin-2-fill text-green-500 text-xl"></i>
              <span>1234 Street Name, City, Country</span>
            </div>

            {/* Optional Map Placeholder */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              Map Placeholder
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            {submitted && (
              <p className="text-green-600 mb-3">Thank you! Your message has been sent.</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
