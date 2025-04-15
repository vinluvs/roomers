import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import useFetchProperties from '@utils/useFetchProperties';
import PropertyCard from '@components/PropertyCard';
import Filters from './Filters';
import AdSpace from '@components/AdSpace';

const PropertiesSection = () => {
  const { properties, fetchMore, hasMore } = useFetchProperties();
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Initial fetch
    fetchMore(1, {}, true);
  }, []);

  // GSAP animation
  useEffect(() => {
    gsap.from('.property-card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [properties]);

  // Infinite Scroll
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMore(nextPage);
    }
  }, [hasMore, page]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <section className="bg-opacity-50 backdrop-blur-md text-white p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🏡 Properties</h2>
        <Filters />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(properties) && properties.length > 0 ? (
            properties.map((property, index) => (
            <div key={index} className="property-card">
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-10">
            😢 No properties found...
          </div>
        )}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="text-center mt-4 text-gray-300 animate-pulse">
          ⏳ Loading more properties...
        </div>
      )}

      <AdSpace />
    </section>
  );
};

export default PropertiesSection;
