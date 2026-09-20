import React from 'react';
import type { Section } from '../../../api/seats/seatApi';

interface Props {
  sections: Section[];
  activeSection: number | null;
  onChange: (id: number) => void;
}

const SectionTabs: React.FC<Props> = ({ sections, activeSection, onChange }) => (
  <div className="flex flex-wrap gap-3 justify-center">
    {sections.map((s) => {
      const active = s.section_id === activeSection;
      return (
        <button
          key={s.section_id}
          onClick={() => onChange(s.section_id)}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
            active
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {s.section_name}
          <span
            className={`ml-2 text-xs ${
              active ? 'text-indigo-200' : 'text-gray-500'
            }`}
          >
            (MK {s.price_per_seat})
          </span>
        </button>
      );
    })}
  </div>
);

export default SectionTabs;