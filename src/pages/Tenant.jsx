import { Link } from "react-router";
import { useState } from "react";


function Tenant() {
  return (
    <div >
      <TenantNav/>
      <div className="m-[100px]">welcome tenant</div>
      
    </div>
  )
}

const TenantNav = () => {
  const [activeTab, setActiveTab] = useState("Search");
  return (
    <div className="flex mt-22 justify-center shadow-md items-center">
    <div className="mynav w-3xl rounded-xl  top-0 z-40">
        <ul className="flex justify-around items-center p-2  font-bold">
          {[ "🔍Search", "🏡My Room", "🔔Notifications"].map((tab) => (
            <Link to={``}
              key={tab}
              className={`tabhover relative py-2 px-4 transition-all duration-300 ${
                activeTab === tab ? "tab" : ""
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
              </Link>))
              }
        </ul>
      </div>
      </div>
  )
}


export default Tenant