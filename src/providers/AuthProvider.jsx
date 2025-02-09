import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoader, setProfileLoader] = useState(false);
  const axiosSecure = useAxiosSecure();

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosSecure.get("/auth").then((data) => {
        setCurrentUser(data?.data);
        console.log("Current Logged In User:", data?.data);
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [profileLoader]);

  const authInfo = {
    currentUser,
    loading,
    setLoading,
    profileLoader,
    logOut,
    setProfileLoader,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
