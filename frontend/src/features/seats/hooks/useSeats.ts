import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getSections, getSeatsBySection, type Section, type Seat } from '../../../api/seats/seatApi';

export const useSeats = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loadingSections, setLoadingSections] = useState(true);
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  // Load sections
  useEffect(() => {
    getSections()
      .then((s) => {
        setSections(s);
        if (s.length > 0) setActiveSection(s[0].section_id);
      })
      .catch(() => toast.error('Failed to load sections'))
      .finally(() => setLoadingSections(false));
  }, []);

  // Load seats when active section changes
  useEffect(() => {
    if (!activeSection) return;
    setLoadingSeats(true);
    getSeatsBySection(activeSection)
      .then(setSeats)
      .catch(() => toast.error('Failed to load seats'))
      .finally(() => setLoadingSeats(false));
  }, [activeSection]);

  // Toggle seat selection (max 5)
  const toggleSeat = (seatId: number) => {
    setSelected((prev) => {
      if (prev.includes(seatId)) {
        toast('Seat removed', { icon: '↩️' });
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= 5) {
        toast.error('Maximum 5 seats per booking');
        return prev;
      }
      toast.success('Seat selected');
      return [...prev, seatId];
    });
  };

  const clearSelection = () => setSelected([]);

  const activeSectionData = sections.find((s) => s.section_id === activeSection);

  return {
    sections,
    activeSection,
    setActiveSection,
    seats,
    loadingSections,
    loadingSeats,
    selected,
    toggleSeat,
    clearSelection,
    activeSectionData,
  };
};