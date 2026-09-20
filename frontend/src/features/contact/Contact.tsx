import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faPaperPlane,
  faUser,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar';
import Footer from '../home/components/Footer';

const Contact: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-base transition mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 font-medium">
            We'd love to hear from you. Reach out with any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Send us a message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="pl-10 w-full rounded-md border border-gray-300 py-2.5 text-base font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 w-full rounded-md border border-gray-300 py-2.5 text-base font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FontAwesomeIcon icon={faCommentDots} className="text-indigo-400" />
                  </div>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="pl-10 w-full rounded-md border border-gray-300 py-2.5 text-base font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-indigo-600 text-white font-extrabold text-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: faMapMarkerAlt, label: 'Address', value: 'Blantyre Regional Branch Library, Malawi', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: faPhone, label: 'Phone', value: '+265 888 123 456', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: faEnvelope, label: 'Email', value: 'info@nls.mw', color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: faClock, label: 'Open Hours', value: 'Mon – Sat: 8AM – 6PM', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex items-start gap-4"
              >
                <div className={`p-3 rounded-lg ${item.bg}`}>
                  <FontAwesomeIcon icon={item.icon} className={`${item.color} text-xl`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-base font-bold text-gray-800 mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default Contact;