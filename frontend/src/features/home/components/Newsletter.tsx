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
    <section className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="reveal max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">Stay Updated</h2>
          <p className="mt-4 text-lg text-blue-100 font-medium">
            Subscribe to receive library updates, announcements, and special offers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-white/30 bg-white/10 px-5 py-4 text-base text-white placeholder-white/70 outline-none focus:border-white"
            />
            <button
              type="submit"
              className="btn-modern inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-extrabold text-blue-700 hover:bg-blue-50 transition"
            >
              Subscribe
            </button>
          </form>

          {success && (
            <p className="mt-4 text-base font-bold text-blue-100">
              ✓ Thanks for subscribing!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;