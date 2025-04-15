const PastProperties = ({ properties }) => {
    if (!properties?.length) return null;
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">⏳ Past Properties</h2>
        {properties.map((property, idx) => (
          <div key={idx} className="mb-4 p-3 bg-zinc-700 bg-opacity-5 rounded">
            <p><b>Location:</b> {property.location}</p>
            <p><b>Type:</b> {property.type}</p>
            <p><b>Stayed Till:</b> {property.vacatedDate || 'Unknown'}</p>
          </div>
        ))}
      </div>
    );
  };
  export default PastProperties;
  