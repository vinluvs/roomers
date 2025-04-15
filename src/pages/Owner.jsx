import React from 'react'
import OwnerProperties from "../components/Ownerpage/OwnerProperties"
import OwnerNav from '@components/OwnerNav'

function Owner() {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
      <OwnerNav currenttab="🏢myproperties" />
      <OwnerProperties/>
    </div>
  )
}

export default Owner
