import { useState } from 'react';

const AddPropertyForm = ({ ownerId, onClose }) => {
  const [formData, setFormData] = useState({
    location: '',
    type: '',
    rent: '',
    area: '',
    owner: ownerId,
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      // Replace with your backend API logic
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('🎉 Property added!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add.');
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-5 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-2">➕ Add New Property</h3>
      <input className="input" name="location" onChange={handleChange} placeholder="Location" />
      <select
            className="input "
            value={formData.type}
            onChange={handleChange}
            name='type'
          >
            <option value="">Type (1BHK, Shop...)</option>
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
      <input className="input" name="rent" onChange={handleChange} placeholder="Rent ₹" type="number" />
      <input className="input" name="area" onChange={handleChange} placeholder="Area (sq.ft)" type="number" />
      <button onClick={submit} className="mt-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700">
        Submit
      </button>
    </div>
  );
};

export default AddPropertyForm;
