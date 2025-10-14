import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are a modern e-commerce platform providing best products for your needs.
            Quality and service are our top priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-white transition-colors duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="hover:text-white transition-colors duration-300">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-white transition-colors duration-300">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-white transition-colors duration-300">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm">1234 Street Name, City, Country</p>
          <p className="text-gray-400 text-sm mt-1">Email: info@example.com</p>
          <p className="text-gray-400 text-sm mt-1">Phone: +123 456 7890</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-3 mt-2">
            <a href="#" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              <i className="ri-facebook-fill text-white"></i>
            </a>
            <a href="#" className="p-2 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors">
              <i className="ri-twitter-fill text-white"></i>
            </a>
            <a href="#" className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors">
              <i className="ri-instagram-fill text-white"></i>
            </a>
            <a href="#" className="p-2 bg-blue-800 rounded-full hover:bg-blue-900 transition-colors">
              <i className="ri-linkedin-fill text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
