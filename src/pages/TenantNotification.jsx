import AdSpace from '@components/AdSpace'
import TenantNav from '@components/TenantNav'
import React from 'react'

function TenantNotification() {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
        <TenantNav currentTab="🔔Notification" />
        <h1 className='mt-20 mx-4 text-3xl font-bold mb-4'>🔔 TenantNotification</h1>
        <AdSpace/>
    </div>
  )
}

export default TenantNotification