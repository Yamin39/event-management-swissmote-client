import { Link } from "react-router-dom";

const Footer = () => {
  const navigation = [
    { name: "Home", to: "/" },
    { name: "Events", to: "/events" },
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value, "Subscribed!");
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="text-xl font-semibold text-primary">Event Management - Swissmote</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="text-sm text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          {/* Email subscription */}
          <form onSubmit={handleSubmit} className="flex max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-l-md border-0 focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>

          {/* Copyright */}
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} EMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
