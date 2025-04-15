const PropertyCard = ({ property, onEdit }) => (
    <div className="property-card bg-white bg-opacity-10 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">{property.type} in {property.location}</h2>
      <p><b>Budget:</b> ₹{property.rent}</p>
      <p><b>Area:</b> {property.area} sq.ft</p>
      <button
        onClick={onEdit}
        className="mt-3 px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
      >
        ✏️ Edit
      </button>
    </div>
  );
  
  export default PropertyCard;
  