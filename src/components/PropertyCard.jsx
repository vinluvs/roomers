import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PropertyCard = ({ data }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
  }, []);

  return (
    <div
      ref={cardRef}
      className=" backdrop-blur-md shadow-md border-2 border-gray-500 rounded-lg p-4 hover:scale-105 transition-all duration-300"
    >
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p>{data.location}</p>
      <p>₹{data.price} / month</p>
      <p>{data.type}</p>
      <p>{data.area} sqft</p>
    </div>
  );
};

export default PropertyCard;
