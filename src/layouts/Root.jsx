import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto w-11/12 font-">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
