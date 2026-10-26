import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 border-t border-gray-200" style={{ backgroundColor: '#F1F5F9', color: '#353535' }}>
      {/* Upper Footer */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + names */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
            <FontAwesomeIcon icon={faBook} className="text-[#082845] text-2xl" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className="text-sm font-extrabold tracking-widest" style={{ color: '#C6AA58' }}>
              BLANTYRE REGIONAL BRANCH LIBRARY
            </span>
            <span className="text-2xl font-extrabold" style={{ color: '#082845' }}>
              e-ticketing system
            </span>
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col space-y-3">
          <span className="font-extrabold text-lg" style={{ color: '#082845' }}>Useful Links</span>
          <a href="/about" className="hover:text-[#186BB1] transition text-base font-medium">About Us</a>
          <a href="/contact" className="hover:text-[#186BB1] transition text-base font-medium">Contact</a>
          <a href="/seats" className="hover:text-[#186BB1] transition text-base font-medium">Buy Ticket</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-3">
          <span className="font-extrabold text-lg" style={{ color: '#082845' }}>Contact Us</span>
          <span className="text-base font-medium">info@nls.mw</span>
          <span className="text-base font-medium">+265 888 123 456</span>
          <span className="text-base font-medium">Blantyre Regional Branch Library</span>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <span className="font-extrabold text-lg" style={{ color: '#082845' }}>Follow Us</span>
          <div className="flex space-x-4 text-2xl" style={{ color: '#606060' }}>
            <a href="#" className="hover:text-[#186BB1] transition" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="hover:text-[#186BB1] transition" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-[#186BB1] transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-[#186BB1] transition" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto text-sm font-medium" style={{ color: '#606060' }}>
        <p>© {currentYear} Blantyre Regional Branch Library. All rights reserved.</p>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#186BB1] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#186BB1] transition">Legal Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;