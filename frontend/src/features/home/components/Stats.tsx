import React, { useEffect, useState } from 'react';
import { Users, MapPin, Award, BookOpen } from 'lucide-react';

interface StatItem {
  icon: React.FC<{ className?: string }>;
  number: number;
  label: string;
  suffix?: string;
}

const Stats: React.FC = () => {
  // ✅ Exact stats from the supervisor's document
  const [stats] = useState<StatItem[]>([
    { icon: Users, number: 200, label: 'Average Daily Users', suffix: '+' },
    { icon: MapPin, number: 2210, label: 'Registered Members', suffix: '+' },
    { icon: Award, number: 1000, label: 'Physical & Digital Resources', suffix: '' }, // Using 1000 to represent "Thousands"
    { icon: BookOpen, number: 49, label: 'Hours/Week', suffix: '' },
  ]);

  const [counts, setCounts] = useState([0, 0, 0, 0]);

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
    <section className="text-white" style={{ backgroundColor: '#082845' }}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className="w-7 h-7 mr-2 text-[#C6AA58]" /> {/* Gold color */}
                  <span className="text-3xl md:text-4xl font-extrabold">
                    {stat.label === 'Physical & Digital Resources' && counts[index] === 1000 ? 'Thousands of' : counts[index]}
                    {stat.label !== 'Physical & Digital Resources' && stat.suffix}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-300">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;