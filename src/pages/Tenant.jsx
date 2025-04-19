
import TenantNav from "@components/TenantNav"
import PropertiesSection from "../components/Tenantpage/PropertiesSection"

function Tenant() {
  return (
    <div className="bg-opacity-50 backdrop-blur-md min-h-screen text-white p-4 rounded-xl shadow-lg">
     <TenantNav currentTab="🔍Search" />
      <PropertiesSection/>
    </div>
  )
}
export default Tenant