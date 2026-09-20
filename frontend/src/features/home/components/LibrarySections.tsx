import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

const sections = [
  {
    icon: faDesktop,
    title: 'Computer Section',
    desc: 'Seats with computer access for research, coding, and online work.',
    capacity: 50,
    price: 'MK 200 / seat',
    color: 'blue',
  },
  {
    icon: faBook,
    title: 'General Reading',
    desc: 'Quiet, comfortable reading space for focused study and revision.',
    capacity: 100,
    price: 'MK 100 / seat',
    color: 'emerald',
  },
  {
    icon: faUsers,
    title: 'Discussion Rooms',
    desc: 'Group study rooms for teamwork, projects, and collaborative work.',
    capacity: 20,
    price: 'MK 300 / seat',
    color: 'purple',
  },
];

const LibrarySections: React.FC = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center max-w-2xl mx-auto reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Library Sections
        </h2>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Three sections to match the way you study best.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s, idx) => (
          <div
            key={s.title}
            className={`card-hover reveal rounded-2xl border border-gray-100 bg-white p-6 shadow-md ${
              idx === 1 ? 'reveal-delay-2' : idx === 2 ? 'reveal-delay-3' : ''
            }`}
          >
            <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <FontAwesomeIcon icon={s.icon} className={`text-${s.color}-600 text-xl`} />
            </div>
            <h3 className="mt-5 font-extrabold text-xl text-gray-900">{s.title}</h3>
            <p className="mt-3 text-base text-gray-600 font-medium leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-5 flex items-center justify-between text-sm font-bold text-gray-500">
              <span>{s.capacity} seats</span>
              <span className="text-blue-600">{s.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LibrarySections;