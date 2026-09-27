import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { getActiveAnnouncements, type Announcement } from '../../../api/announcements/announcementApi';

const AnnouncementsBar: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    getActiveAnnouncements()
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section className="bg-blue-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full shrink-0">
          <FontAwesomeIcon icon={faBullhorn} className="text-yellow-300 text-base" />
          <span className="text-sm font-extrabold tracking-wider uppercase">
            Announcements
          </span>
        </div>

        {/* Marquee */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {announcements.concat(announcements).map((a, idx) => (
              <div key={idx} className="flex items-center gap-3 text-base font-semibold">
                <span className="font-extrabold text-yellow-300 text-lg">{a.title}:</span>
                <span className="text-white/95">{a.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-ticker {
            animation: ticker 35s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default AnnouncementsBar;