import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const contactInfo = [
  {
    icon: faMapMarkerAlt,
    label: 'Address',
    value: 'Blantyre Regional Branch Library',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: faPhone,
    label: 'Phone',
    value: '+265 888 123 456',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: faEnvelope,
    label: 'Email',
    value: 'info@nls.mw',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: faClock,
    label: 'Open Hours',
    value: 'Mon – Sat: 8AM – 6PM',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const ContactSection: React.FC = () => (
  <section className="bg-white py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info) => (
          <div
            key={info.label}
            className="card-hover reveal rounded-2xl border border-gray-100 bg-white p-6 shadow-md text-center"
          >
            <div
              className={`mx-auto h-14 w-14 rounded-xl ${info.bg} flex items-center justify-center`}
            >
              <FontAwesomeIcon icon={info.icon} className={`${info.color} text-xl`} />
            </div>
            <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide">
              {info.label}
            </p>
            <p className="mt-2 text-base font-bold text-gray-800">{info.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center reveal">
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-indigo-600 text-white font-extrabold text-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition"
        >
          Send us a message
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  </section>
);

export default ContactSection;