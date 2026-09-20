import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faChair,
  faCreditCard,
  faTicket,
} from '@fortawesome/free-solid-svg-icons';

const steps = [
  { icon: faUserPlus, title: 'Register', desc: 'Create your free account' },
  { icon: faChair, title: 'Select Seat', desc: 'Pick from 3 sections' },
  { icon: faCreditCard, title: 'Pay Online', desc: 'Secure via PayChangu' },
  { icon: faTicket, title: 'Get Ticket', desc: 'QR sent to email' },
];

const HowToUse: React.FC = () => (
  <section className="bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          How to Book a Seat
        </h2>
        <p className="mt-3 text-lg text-gray-600 font-medium">
          Four simple steps to secure your spot.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.title}
            className="card-hover rounded-2xl border border-gray-100 bg-white p-6 shadow-md text-center"
          >
            <div className="mx-auto h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <FontAwesomeIcon icon={s.icon} className="text-blue-600 text-2xl" />
            </div>
            <h3 className="mt-5 font-extrabold text-xl text-gray-900">{s.title}</h3>
            <p className="mt-2 text-base text-gray-600 font-medium">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToUse;