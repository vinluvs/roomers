import TenantNav from '@components/TenantNav'
import React, { useEffect } from 'react';
import useFetchProperties from '@utils/useFetchProperties';
import CurrentProperty from '@components/TenantRoom/CurrentProperty';
import PastProperties from '@components/TenantRoom/PastProperties';
import RentPayment from '@components/TenantRoom/RentPayment';
import PaymentHistory from '@components/TenantRoom/PaymentHistory';
import AdSpace from '@components/AdSpace';

const TenantRoom = () => {
  const tenantId = 'abc123'; // 🚨 Replace with dynamic logic later

  const {
    properties,
    fetchMore,
  } = useFetchProperties();

  useEffect(() => {
    fetchMore(1, {}, true); // get all properties
  }, []);

  const current = properties.find(prop => prop.tenants?.includes(tenantId));
  const past = properties.filter(prop => prop.oldtenants?.includes(tenantId));

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
      <TenantNav currentTab="🏡My Room" />
      <h1 className="text-3xl font-bold mb-4">🛏️ Your Room</h1>

      {current ? <CurrentProperty property={current} /> : (
        <p className="text-gray-400 mb-4">You're not currently assigned to any property.</p>
      )}

      {current && (
        <>
          <RentPayment property={current} />
          <PaymentHistory tenantId={tenantId} />
        </>
      )}

      <PastProperties properties={past} />
      <AdSpace/>
    </div>
  );
};

export default TenantRoom;
