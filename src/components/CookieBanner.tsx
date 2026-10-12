import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('era_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('era_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('era_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-40 bg-[#17233b] text-[#f3f3ec] p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-lg">
      <div className="space-y-3">
        <p className="text-xs text-[#f3f3ec]/80 leading-relaxed">
          We use cookies to enhance your browsing experience, analyze site traffic, and serve tailored content for ERA Residence.
        </p>

        <div className="flex items-center space-x-3 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-4 rounded-full bg-[#f3f3ec] hover:bg-[#b5cedb] text-[#17233b] text-[11px] uppercase tracking-widest font-semibold transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 py-2 px-4 rounded-full border border-white/20 hover:border-white text-[#f3f3ec] text-[11px] uppercase tracking-widest font-medium transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
