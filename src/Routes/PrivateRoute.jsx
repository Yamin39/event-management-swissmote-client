import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-semibold text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }
  console.log({ currentUser, loading });

  if (currentUser || localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
