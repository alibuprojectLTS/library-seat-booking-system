import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AnnouncementsBar from './components/AnnouncementsBar';
import LibraryStatus from './components/LibraryStatus';
import HowToUse from './components/HowToUse';
import LibrarySections from './components/LibrarySections';
import Newsletter from './components/Newsletter';
import ContactSection from './components/ContactSection';
import Partners from './components/Partners';

const Home: React.FC = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 }
    );
	
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Stats />
      <AnnouncementsBar />
      <LibraryStatus />
      <HowToUse />
      <LibrarySections />
      <Newsletter />
      <ContactSection />     {/* ← NEW: below Newsletter, above Partners */}
      <Partners />
      <Footer />
    </div>
  );
};

export default Home;