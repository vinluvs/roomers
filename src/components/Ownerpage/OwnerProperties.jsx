import React, { useState, useEffect } from 'react';
import useFetchProperties from '@utils/useFetchProperties';
import PropertyCard from './PropertyCard';
import AddPropertyForm from './AddPropertyForm';
import EditPropertyForm from './EditPropertyForm';
import { gsap } from 'gsap';

const OwnerProperties = () => {
  const ownerId = 'xyz123'; // 🔁 Replace with dynamic auth logic
  const { properties, fetchMore } = useFetchProperties();

  const [editingProperty, setEditingProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchMore(1, {}, true); // fetch all
  }, []);

  const ownerProperties = properties.filter(p => p.owner === ownerId);

  useEffect(() => {
    gsap.from('.property-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [ownerProperties]);

  return (
    <div className="p-6 text-white bg-black bg-opacity-40 min-h-screen backdrop-blur-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏠 Your Properties</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showAddForm ? 'Cancel' : '➕ Add Property'}
        </button>
      </div>

      {showAddForm && <AddPropertyForm ownerId={ownerId} onClose={() => setShowAddForm(false)} />}

      {editingProperty && (
        <EditPropertyForm
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {ownerProperties.map((property, idx) => (
          <PropertyCard
            key={idx}
            property={property}
            onEdit={() => setEditingProperty(property)}
          />
        ))}
      </div>
    </div>
  );
};

export default OwnerProperties;
