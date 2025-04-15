import { useState } from 'react';
import axios from 'axios';

const useFetchProperties = () => {
  const [properties, setProperties] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async (page = 1, filters = {}, reset = false) => {
    try {
      const query = new URLSearchParams({ ...filters, page, limit: 5 }).toString();
      const res = await axios.get(`/api/properties?${query}`);
      
      const data = Array.isArray(res?.data) ? res.data : [];
      console.log("Fetched properties:", data);

      if (reset) {
        setProperties(data);
      } else {
        setProperties((prev) => [...prev, ...data]);
      }

      // 🔚 if less than 5, assume no more data
      setHasMore(data.length === 5);

    } catch (err) {
      console.error("Error fetching properties:", err.message);
      setProperties([]); // gracefully fallback
      setHasMore(false);
    }
  };

  return { properties, fetchMore, hasMore };
};

export default useFetchProperties;
