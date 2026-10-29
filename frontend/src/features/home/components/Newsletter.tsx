import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section style={{ backgroundColor: '#082845' }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="reveal max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#C6AA58]">Stay Updated</h2>
          <p className="mt-4 text-lg text-blue-100 font-medium">
            Subscribe to receive library updates, announcements, and special offers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-white/30 bg-white/10 px-5 py-4 text-base text-white placeholder-white/70 outline-none focus:border-[#C6AA58]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-extrabold text-[#082845] hover:opacity-90 transition"
              style={{ backgroundColor: '#F1F5F9' }}
            >
              Subscribe
            </button>
          </form>

          {success && (
            <p className="mt-4 text-base font-bold text-[#C6AA58]">
              ✓ Thanks for subscribing!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;