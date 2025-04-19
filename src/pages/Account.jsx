import React, { useState, useEffect } from "react";

function Account() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT", // Replace with your API endpoint
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditable(false);
        alert("Details updated successfully!");
      } else {
        alert("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="mt-20 mx-4 flex justify-center items-center h-screen ">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Account Details</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none ${
                isEditable ? "focus:ring-2 focus:ring-blue-500" : "opacity-50"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none ${
                isEditable ? "focus:ring-2 focus:ring-blue-500" : "opacity-50"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none ${
                isEditable ? "focus:ring-2 focus:ring-blue-500" : "opacity-50"
              }`}
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end space-x-4">
          {!isEditable ? (
            <button
              onClick={() => setIsEditable(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;