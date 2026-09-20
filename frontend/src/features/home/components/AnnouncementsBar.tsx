import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/core/apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  announcement_type: string;
  priority: string;
  is_pinned: boolean;
}

const AnnouncementsBar: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    apiClient
      .get('/announcements')
      .then(({ data }) => setAnnouncements(data.announcements || []))
      .catch(() => setAnnouncements([]));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section className="bg-blue-50 border-y border-blue-100">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3 overflow-hidden">
        <FontAwesomeIcon icon={faBullhorn} className="text-blue-600" />
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap">
          {announcements.map((a) => (
            <div key={a.announcement_id} className="text-sm text-slate-700">
              <span className="font-bold text-blue-700">
                {a.is_pinned ? '📌 ' : ''}
                {a.title}:
              </span>{' '}
              <span>{a.content}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsBar;