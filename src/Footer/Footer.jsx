import React from "react";

import img from '../Navber/car-logo.jpg'

import { Link } from "react-router";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-base-content mt-10">
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1️⃣ Brand Info */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-3">
            <img src={img} alt="CarBy Logo" className="w-12 h-12 rounded-full border-2 border-pink-500" />
            <span className="text-2xl font-bold text-gray-800">CarBy</span>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your trusted car rental partner. Rent, drive and explore with comfort and confidence.
          </p>
        </div>

        {/* 2️⃣ Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-pink-500">Contact Info</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-pink-500" /> +8801609853542
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" /> mehedi@carby.com
            </li>
            <li className="flex items-center gap-2">
              <FaLocationDot className="text-pink-500" /> Dhaka, Bangladesh
            </li>
            
          </ul>
        </div>

        {/* 3️⃣ Useful Links & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-pink-500">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/terms" className="hover:text-pink-600 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-pink-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-600 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaFacebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} <span className="font-semibold text-pink-500">CarBy</span> — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
