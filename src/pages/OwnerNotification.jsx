import React, { useEffect, useState } from 'react';
import useFetchProperties from '@utils/useFetchProperties';
import { updatePropertyRequest, addTenantToProperty } from '@utils/propertyActions';
import gsap from 'gsap';
import OwnerNav from '@components/OwnerNav';

const OwnerNotification = () => {
  const ownerId = 'xyz123'; // Replace with actual auth logic
  const { properties, fetchMore } = useFetchProperties();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchMore(1, {}, true);
  }, []);

  useEffect(() => {
    const ownedProps = properties.filter(p => p.owner === ownerId);
    const allRequests = [];

    ownedProps.forEach(prop => {
      prop.requests?.forEach(req =>
        allRequests.push({ ...req, propertyId: prop._id, propertyName: prop.name })
      );
    });

    // Optional: sort by status or date
    allRequests.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRequests(allRequests);
  }, [properties]);

  const cycleStatus = async (req) => {
    const nextStatus = req.status === 'pending' ? 'received' : req.status === 'received' ? 'accepted' : 'accepted';

    // Update in DB
    await updatePropertyRequest(req.propertyId, req.id, nextStatus);

    // Optional: Add to tenants if accepted
    if (nextStatus === 'accepted') {
      await addTenantToProperty(req.propertyId, {
        id: req.tenantId,
        name: req.tenantName,
        photo: req.tenantPhoto,
        phone: req.tenantPhone,
        status: 'upcoming',
        dueAmount: 0,
        dueDate: '',
      });
    }

    // Animate + update UI
    gsap.fromTo(`#req-${req.id}`, { scale: 0.9 }, { scale: 1, duration: 0.2 });
    setRequests(prev =>
      prev.map(r => (r.id === req.id ? { ...r, status: nextStatus } : r))
    );
  };

  return (
    <div className=" bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
      <OwnerNav currenttab="🔔Notifications" />
      <h1 className="mt-10 text-3xl font-bold mb-6">📬 Owner Notifications</h1>

      {requests.length === 0 ? (
        <p className="text-gray-400">No requests right now.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {requests.map(req => (
            <div
              key={req.id}
              id={`req-${req.id}`}
              onClick={() => cycleStatus(req)}
              className={`cursor-pointer bg-white bg-opacity-10 rounded-xl p-4 transition-all shadow-lg backdrop-blur-md hover:bg-opacity-20`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    req.tenantPhoto ||
                    `https://api.dicebear.com/7.x/thumbs/svg?seed=${req.tenantName}`
                  }
                  className="w-14 h-14 rounded-full border border-white"
                  alt="tenant"
                />
                <div>
                  <h2 className="font-semibold text-lg">{req.tenantName}</h2>
                  <p className="text-xs text-gray-300">
                    {req.type === 'new' ? 'New Request' : 'Existing Tenant'}
                  </p>
                  <p className="text-sm mt-1 text-white/70">{req.message}</p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  req.status === 'pending'
                    ? 'bg-yellow-500 text-black'
                    : req.status === 'received'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'
                }`}>
                  {req.status.toUpperCase()}
                </span>
                <p className="text-sm text-gray-400">{req.propertyName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerNotification;
