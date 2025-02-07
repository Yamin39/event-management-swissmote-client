import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: "Home", href: "", isPrivate: false },
    { text: "Events", href: "/events", isPrivate: false },
    { text: "Create Event", href: "/services", isPrivate: true },
  ];

  return (
    <nav className="py-8 nav">
      <div>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* <span className="text-xl font-bold text-gray-800">EMS</span> */}
            <img src={logo} className="w-26" alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink key={item.text} to={item.href} className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium`}>
                {item.text}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <Link to="/login" className="bg-[#007bff] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#007bff]/90">
              Login
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <NavLink key={item.text} to={item.href} className="text-gray-600 hover:text-gray-900 block px-3 py-2 border-b text-base font-medium">
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
