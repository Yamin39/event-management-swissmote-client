import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Events from "../pages/Events/Events";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent></CreateEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents></ManageEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/events",
        element: <Events></Events>,
      },
    ],
  },
]);

export default router;
