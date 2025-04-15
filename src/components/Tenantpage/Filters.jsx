import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const Filters = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({budget: 0, location: '', type: '', minArea: ''});
  const [budget, setBudget] = useState(0);

  const handleApply = () => {
    onFilterChange(localFilters);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-white bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20">
        <SlidersHorizontal size={20} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-black/80 backdrop-blur-md text-white p-4 rounded-xl z-10 space-y-3">
          <input
            placeholder="Location"
            className="w-full p-2 bg-white/10 rounded"
            onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          />
          <input
            placeholder="Max Budget"
            type='range'
            min={0}
            max={200000}
            step={1000}
            className="w-full p-2 bg-white/10 rounded"
            onChange={(e) => {
              setLocalFilters({ ...localFilters, budget: e.target.value })
              setBudget(e.target.value)
            }}
          />
          <p className="mt-2">Selected Budget: ₹{budget}</p>
          <select
            className="w-full p-2 bg-zinc-800 rounded"
            onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value })}
          >
            <option value="">All Types</option>
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
          <input
            placeholder="Min Area (sqft)"
            type="number"
            className="w-full p-2 bg-white/10 rounded"
            onChange={(e) => setLocalFilters({ ...localFilters, minArea: e.target.value })}
          />
          <button onClick={handleApply} className="bg-blue-500 w-full py-2 rounded">Apply Filters</button>
        </div>
      )}
    </div>
  );
};

export default Filters;
