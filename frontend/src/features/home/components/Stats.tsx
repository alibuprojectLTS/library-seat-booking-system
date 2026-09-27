import React, { useEffect, useState } from 'react';
import { Users, MapPin, Award, BookOpen } from 'lucide-react';
import apiClient from '../../../api/core/apiClient';

interface StatItem {
  icon: React.FC<{ className?: string }>;
  number: number;
  label: string;
  suffix?: string;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { icon: Users, number: 0, label: 'Total Seats', suffix: '+' },
    { icon: MapPin, number: 0, label: 'Library Sections', suffix: '' },
    { icon: Award, number: 0, label: 'Bookings Made', suffix: '+' },
    { icon: BookOpen, number: 24, label: 'Hours Weekly', suffix: '' },
  ]);

  const [counts, setCounts] = useState([0, 0, 0, 0]);

  // Fetch real stats
  useEffect(() => {
    apiClient
      .get('/status/stats')
      .then(({ data }) => {
        if (!data?.stats) return;
        const { totalSeats, totalSections, totalBookings, hoursWeekly } = data.stats;

        setStats([
          { icon: Users, number: totalSeats ?? 0, label: 'Total Seats', suffix: '+' },
          { icon: MapPin, number: totalSections ?? 0, label: 'Library Sections', suffix: '' },
          { icon: Award, number: totalBookings ?? 0, label: 'Bookings Made', suffix: '+' },
          { icon: BookOpen, number: hoursWeekly ?? 24, label: 'Hours Weekly', suffix: '' },
        ]);
      })
      .catch(() => {});
  }, []);

  // Animate counters when stats update
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = [];
    setCounts(stats.map(() => 0));

    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.number;
      const stepTime = Math.max(Math.floor(1500 / Math.max(end, 1)), 15);

      const timer = setInterval(() => {
        start += 1;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = start;
          return next;
        });
        if (start >= end) clearInterval(timer);
      }, stepTime);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, [stats]);

  return (
    <section className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className="w-7 h-7 mr-2 text-yellow-300" />
                  <span className="text-3xl font-extrabold">
                    {counts[index]}
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-100">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;