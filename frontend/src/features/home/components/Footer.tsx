import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-800 py-14 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + names */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden bg-blue-50">
            <FontAwesomeIcon icon={faBook} className="text-blue-900 text-2xl" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span
              className="text-sm font-extrabold tracking-widest"
              style={{ color: '#C6AA58' }}
            >
              N A T I O N A L &nbsp; L I B R A R Y
            </span>
            <span className="text-2xl font-extrabold text-blue-900">
              LIBRARYSEAT
            </span>
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col space-y-3">
          <span className="font-extrabold text-lg text-gray-900">Useful Links</span>
          <a href="/about" className="hover:text-blue-600 transition text-base font-medium">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600 transition text-base font-medium">
            Contact
          </a>
          <a href="/seats" className="hover:text-blue-600 transition text-base font-medium">
            Book Seats
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-3">
          <span className="font-extrabold text-lg text-gray-900">Contact Us</span>
          <span className="text-base font-medium">info@nls.mw</span>
          <span className="text-base font-medium">+265 888 123 456</span>
          <span className="text-base font-medium">Blantyre Regional Branch Library</span>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <span className="font-extrabold text-lg text-gray-900">Follow Us</span>
          <div className="flex space-x-4 text-2xl text-gray-700">
            <a href="#" className="hover:text-blue-600 transition" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-500 transition" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-base font-medium">
        © {currentYear} National Library Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;