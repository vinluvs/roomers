const EditPropertyForm = ({ property, onClose }) => {
    const [formData, setFormData] = useState({ ...property });
  
    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const submit = async () => {
      try {
        await fetch(`/api/properties/${property._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        alert('✅ Property updated!');
        onClose();
      } catch (err) {
        console.error(err);
        alert('❌ Update failed.');
      }
    };
  
    return (
      <div className="bg-gray-800 bg-opacity-5 p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-2">✏️ Edit Property</h3>
        <input className="input" name="location" value={formData.location} onChange={handleChange} />
        <select className="input" name="type" onChange={handleChange}>
        <option value={formData.type}>{formData.type}</option>
            <option value="single room">Single Room</option>
            <option value="1RK">1RK</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
            <option value="warehouse">Warehouse</option>
            <option value="pg-boys">PG - Boys</option>
            <option value="pg-girls">PG - Girls</option>
        </select>
        <input className="input" name="rent" value={formData.rent} onChange={handleChange} />
        <input className="input" name="area" value={formData.area} onChange={handleChange} />
        <button onClick={submit} className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default EditPropertyForm;
  