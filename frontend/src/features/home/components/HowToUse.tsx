import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faChair,
  faCreditCard,
  faTicket,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';

// ✅ Added the POS step
const steps = [
  { icon: faUserPlus, title: 'Register', desc: 'Create your free account' },
  { icon: faChair, title: 'Select Seat', desc: 'Choose from available seats' },
  { icon: faCreditCard, title: 'Pay Online', desc: 'Secure via PayChangu' },
  { icon: faMoneyBillWave, title: 'Or Pay Cash', desc: 'Buy at the door (POS)' },
  { icon: faTicket, title: 'Get Ticket', desc: 'QR sent to email' },
];

const HowToUse: React.FC = () => (
  <section className="bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          How to Buy a Ticket
        </h2>
        <p className="mt-3 text-lg text-gray-600 font-medium">
          Five simple steps to secure your spot. Pay online or with cash at the door.
        </p>
      </div>

      {/* ✅ Changed grid to fit 5 items (lg:grid-cols-5) */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="card-hover rounded-2xl border border-gray-100 bg-white p-6 shadow-md text-center flex flex-col items-center justify-start"
          >
            <div className="mx-auto h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
              <FontAwesomeIcon icon={s.icon} className="text-blue-600 text-2xl" />
            </div>
            <h3 className="mt-4 font-extrabold text-lg text-gray-900 leading-tight">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToUse;