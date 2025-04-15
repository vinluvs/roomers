import { useState } from "react";
import { Link } from "react-router-dom";

function OwnerNav(currenttab) {
  
    const [activeTab] = useState(currenttab.currenttab);

    const tabs = [
        "🏢myproperties",
        "🙋Mytenants",
        "🔔Notifications",
    ];
    const paths = {
        "🏢myproperties": "Owner",
        "🙋Mytenants": "mytenants",
        "🔔Notifications": "notifications",
    };
    
  return (
    <div className="flex mt-22 justify-center shadow-md items-center">
    <div className="mynav w-3xl rounded-xl  top-0 z-40">
        <ul className="flex justify-around items-center p-2  font-bold">
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
      </div>
  )
}

export default OwnerNav
