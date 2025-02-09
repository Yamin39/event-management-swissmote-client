import { Loader2, LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import user from "../../../assets/icons/user.png";
import logo from "../../../assets/images/logo.png";
import useAuth from "../../../hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, loading, logOut } = useAuth();
  const role = currentUser?.role;
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cardRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: "Home", to: "", isAdminOnly: false },
    { text: "Events", to: "/events", isAdminOnly: false },
    { text: "Create Event", to: "/create-event", isAdminOnly: true },
    { text: "Manage Events", to: "/manage-events", isAdminOnly: true },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) => !item.isAdminOnly || role === "admin");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  // handle logout
  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
    setIsProfileOpen(false);
  };

  return (
    <nav className="pt-2 pb-8 nav">
      <div>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} className="w-26" alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredMenuItems.map((item) => (
              <NavLink key={item.text} to={item.to} className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium`}>
                {item.text}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            {loading ? (
              <span>
                <Loader2 className="animate-spin size-6" />
              </span>
            ) : (
              <>
                {currentUser?.email ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="relative z-[1] max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer"
                    >
                      <img src={user} className="size-full object-cover" alt="user" />
                    </button>

                    <div
                      className={`absolute z-10 bg-white rounded-2xl w-fit px-4 py-4 duration-300
              ${isProfileOpen ? "opacity-100 top-14 right-0 scale-3d" : "scale-0 opacity-0 -top-10 -right-10"}
              `}
                      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
                      ref={cardRef}
                    >
                      <ul className="flex flex-col gap-4">
                        {/* user */}
                        <li>
                          <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600 duration-300">
                            <UserRound className="w-6" />

                            <span>Profile</span>
                          </Link>
                        </li>

                        {/* logout */}
                        <li>
                          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-blue-600 duration-300">
                            <LogOut />

                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                    Login
                  </Link>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {filteredMenuItems.map((item) => (
            <NavLink key={item.text} to={item.to} className="text-gray-600 hover:text-gray-900 block px-3 py-2 border-b text-base font-medium">
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;