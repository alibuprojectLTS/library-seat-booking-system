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
  <section className="bg-slate-50/60">
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center max-w-2xl mx-auto reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          How to Book a Seat
        </h2>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Four simple steps to secure your spot.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div
            key={s.title}
            className={`card-hover reveal rounded-2xl border border-gray-100 bg-white p-6 shadow-md text-center ${
              idx === 1
                ? 'reveal-delay-1'
                : idx === 2
                ? 'reveal-delay-2'
                : idx === 3
                ? 'reveal-delay-3'
                : ''
            }`}
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