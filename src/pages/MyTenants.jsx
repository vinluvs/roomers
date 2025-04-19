import React, { useEffect, useState } from 'react';
import useFetchProperties from '@utils/useFetchProperties';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import OwnerNav from '@components/OwnerNav';

const MyTenants = () => {
  const ownerId = 'xyz123'; // replace with actual owner ID
  const { properties, fetchMore } = useFetchProperties();
  const [currentTenants, setCurrentTenants] = useState([]);
  const [oldTenants, setOldTenants] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    fetchMore(1, {}, true);
  }, []);

  useEffect(() => {
    const ownedProperties = properties.filter(p => p.owner === ownerId);
    const allCurrent = [];
    const allOld = [];

    ownedProperties.forEach(prop => {
      prop.tenants?.forEach(tenant => allCurrent.push({ ...tenant, propertyId: prop._id }));
      prop.oldtenants?.forEach(tenant => allOld.push({ ...tenant, propertyId: prop._id }));
    });

    const sortedCurrent = [...allCurrent].sort((a, b) => {
      const getOrder = status => ({ due: 0, upcoming: 1, paid: 2 }[status] || 3);
      return getOrder(a.status) - getOrder(b.status);
    });

    setCurrentTenants(sortedCurrent);
    setOldTenants(allOld);
  }, [properties]);

  const filteredTenants = currentTenants.filter(t =>
    filterStatus === 'all' ? true : t.status === filterStatus
  );

  const collectRent = tenant => {
    setSelectedTenant(tenant);
    gsap.fromTo('#rentModal', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const closeModal = () => {
    gsap.to('#rentModal', { scale: 0.6, opacity: 0, duration: 0.3, onComplete: () => setSelectedTenant(null) });
  };

  return (
    <div className=" bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
      <OwnerNav currenttab="🙋Mytenants" />

      <div className="flex p-6 gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">👥 My Tenants</h1>

        {/* 🔘 Filter Buttons */}
        <div className="mb-4 flex gap-2">
          {['all', 'due', 'upcoming', 'paid'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1 rounded-full ${
                filterStatus === status ? 'bg-blue-600' : 'bg-emerald-900 bg-opacity-10'
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 🎴 Tenant Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTenants.length === 0 ? (
            <p>No tenants found 😶</p>
          ) : (
            filteredTenants.map(tenant => (
              <div
                key={tenant.id}
                className="bg-fuchsia-900 bg-opacity-10 p-4 rounded-xl shadow backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      tenant.photo ||
                      'https://api.dicebear.com/7.x/adventurer/svg?seed=' + tenant.name
                    }
                    alt={tenant.name}
                    className="w-16 h-16 rounded-full border border-white"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{tenant.name}</h2>
                    <p className="text-sm text-gray-300">{tenant.phone}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p
                    className={`font-bold ${
                      tenant.status === 'due'
                        ? 'text-red-400'
                        : tenant.status === 'upcoming'
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {tenant.status === 'due' && `Due: ₹${tenant.dueAmount}`}
                    {tenant.status === 'upcoming' && `Upcoming: ₹${tenant.dueAmount} on ${tenant.dueDate}`}
                    {tenant.status === 'paid' && `Paid ✅`}
                  </p>

                  <div className="flex mt-2 gap-2">
                    <Link
                      to={`/tenant/${tenant.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      🔍 Details
                    </Link>
                    {tenant.status !== 'paid' && (
                      <button
                        onClick={() => collectRent(tenant)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      >
                        💸 Collect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🧾 Old Tenants Side Panel */}
      <aside className="w-[300px] bg-orange-900 bg-opacity-5 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-3">📜 Old Tenants</h2>
        <ul className="space-y-3">
          {oldTenants.length === 0 ? (
            <li>No old tenants 😴</li>
          ) : (
            oldTenants.map(t => (
              <li key={t.id} className="flex items-center gap-3">
                <img
                  src={
                    t.photo ||
                    'https://api.dicebear.com/7.x/thumbs/svg?seed=' + t.name
                  }
                  alt={t.name}
                  className="w-10 h-10 rounded-full border border-white"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-300">{t.phone}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* 💸 Rent Collection Modal */}
      {selectedTenant && (
        <div
          id="rentModal"
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div className="bg-pink-900 text-black p-6 rounded-xl w-[90%] max-w-sm shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-black text-xl"
            >
              ✖️
            </button>
            <h2 className="text-xl font-bold mb-2">Collect Rent</h2>
            <p>
              Receive ₹{selectedTenant.dueAmount} from{" "}
              <span className="font-bold">{selectedTenant.name}</span>?
            </p>
            <button
              onClick={() => {
                alert("Rent marked as collected!");
                closeModal();
              }}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              ✅ Confirm Collection
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MyTenants;

