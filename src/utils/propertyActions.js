const API_BASE_URL = 'http://your-python-backend-url/api'; // Replace with your Python backend URL

// Cycle request status
export const updatePropertyRequest = async (propertyId, requestId, newStatus) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-property-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId,
        requestId,
        newStatus,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update property request: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating property request:', error);
    throw error;
  }
};

// Add accepted tenant to property
export const addTenantToProperty = async (propertyId, tenantData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-tenant-to-property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId,
        tenantData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add tenant to property: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding tenant to property:', error);
    throw error;
  }
};
