const CurrentProperty = ({ property }) => (
    <div className="mb-6 p-4 bg-zinc-700 bg-opacity-10 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">🏠 Current Property</h2>
      <p><b>Location:</b> {property.location}</p>
      <p><b>Type:</b> {property.type}</p>
      <p><b>Rent:</b> ₹{property.rent}/month</p>
    </div>
  );
  export default CurrentProperty;
  