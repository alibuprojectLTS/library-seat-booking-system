import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBook, faUsers, faChair } from '@fortawesome/free-solid-svg-icons';
import { getSections, type Section } from '../../../api/seats/seatApi';

// Keys MUST match DB `section_name` exactly
const SECTION_META: Record<
  string,
  { icon: any; bg: string; border: string; text: string }
> = {
  'Computer Section': {
    icon: faDesktop,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-600',
  },
  'General Reading': {
    icon: faBook,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-600',
  },
  'Discussion Rooms': {
    icon: faUsers,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-600',
  },
};

const FALLBACK_META = {
  icon: faChair,
  bg: 'bg-gray-50',
  border: 'border-gray-100',
  text: 'text-gray-600',
};

const LibrarySections: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSections()
      .then(setSections)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Library Sections
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              Loading sections...
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md animate-pulse"
              >
                <div className="h-14 w-14 rounded-xl bg-gray-100" />
                <div className="mt-5 h-6 bg-gray-100 rounded w-3/4" />
                <div className="mt-3 h-4 bg-gray-100 rounded w-full" />
                <div className="mt-3 h-4 bg-gray-100 rounded w-5/6" />
                <div className="mt-5 h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
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
          {sections.map((s, idx) => {
            const meta = SECTION_META[s.section_name] || FALLBACK_META;

            return (
              <div
                key={s.section_id}
                className={`card-hover reveal rounded-2xl border border-gray-100 bg-white p-6 shadow-md ${
                  idx === 1 ? 'reveal-delay-2' : idx === 2 ? 'reveal-delay-3' : ''
                }`}
              >
                <div
                  className={`h-14 w-14 rounded-xl ${meta.bg} flex items-center justify-center border ${meta.border}`}
                >
                  <FontAwesomeIcon icon={meta.icon} className={`${meta.text} text-xl`} />
                </div>

                <h3 className="mt-5 font-extrabold text-xl text-gray-900">
                  {s.section_name}
                </h3>

                <p className="mt-3 text-base text-gray-600 font-medium leading-relaxed">
                  {s.description}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm font-bold text-gray-500">
                  <span>{s.capacity} seats</span>
                  <span className="text-blue-600">
                    MK {Number(s.price_per_seat).toLocaleString()} / seat
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LibrarySections;