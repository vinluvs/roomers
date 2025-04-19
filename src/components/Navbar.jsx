import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

const tabs = ["🧑‍🎓Tenant", "🧑‍🏫Owner", "⚙️Account"];
const paths = { "🧑‍🎓Tenant": "", "🧑‍🏫Owner": "owner", "⚙️Account": "account" }; // mapping to routes so that icons doesn't interfere
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("🧑‍🎓Tenant");
  const menuRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { x: "100%" },
          { x: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" }
        );
      } else {
        gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      }
    }, menuRef);

    return () => ctx.revert(); // Cleanup animation on unmount
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] backdrop-blur-sm p-4 text-white shadow-md shadow-neutral-800/50">
      <div className="flex justify-between  items-center max-w-7xl mx-auto">
        {/* Desktop Menu */}
        {!isOpen && <h1 className="text-2xl font-bold">R000MS</h1>}
        <div className="hidden md:flex space-x-6">
          {tabs.map((tab) => (
            <NavLink
              to={`/${paths[tab]}`}
              key={tab}
              className={`tabhover relative py-2 px-4 transition-all duration-300 ${
                activeTab === tab ? "tab" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </NavLink>
          ))}
        </div>
        <button
          className="md:hidden z-60 bg-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Always Hidden except on clicking menu) */}
      <div
        ref={menuRef}
        className={`bg-primary fixed top-0 left-0 z-50 h-dvh mx-auto p-4 flex flex-col justify-center items-center min-w-full shadow-md transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="text-4xl font-bold mb-8">R000MS</h1>
        {tabs.map((tab) => (
          <NavLink
            to={`/${paths[tab]}`}
            key={tab}
            className={`tabhover relative py-4 px-4 transition-all duration-300 ${
              activeTab === tab ? "tab" : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              setIsOpen(false);
            }}
          >
            {tab}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
