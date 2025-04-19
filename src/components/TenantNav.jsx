import { useState } from "react";
import { Link } from "react-router-dom";

function TenantNav(currentTab) {
    const [activeTab] = useState(currentTab.currentTab);

    const tabs = [
        "🔍Search",
        "🏡My Room",
        "🔔Notification",
    ];
    const paths = {
        "🔍Search": "",
        "🏡My Room": "TenantRoom",
        "🔔Notification": "TenantNotification",
    };
    
  return (
    <div className="flex mt-20 justify-center rounded-xl z-40 ">
        <ul className="flex justify-around w-2xl p-2 shadow-md  ">
          {tabs.map((tab) => (
            <Link to={`/${paths[tab]}`}
              key={tab}
              className={`tabhover relative py-2 px-4 transition-all duration-300 ${
                activeTab === tab ? "tab" : ""
              }`}>
              {tab}
              </Link>))
              }
        </ul>
      </div>
  )
}

export default TenantNav
