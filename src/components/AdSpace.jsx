import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AdSpace = () => {
  const adRef = useRef();

  useEffect(() => {
    gsap.fromTo(adRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
  }, []);

  return (
    <div
      ref={adRef}
      className="mt-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-2xl text-center text-white border border-white/10"
    >
      <h2 className="text-xl font-semibold mb-2">🔥 Ad Space</h2>
      <p>Place for your sponsors, offers, or referral bonuses.</p>
    </div>
  );
};

export default AdSpace;
