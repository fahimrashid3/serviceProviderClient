import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import OurServices from "../pages/ourServices/OurServices";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Appointment from "../pages/appointment/Appointment";
import ShortProfile from "../pages/profile/ShortProfile";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../layout/Dashboard";
import MyAppointment from "../pages/dashboard/MyAppointment";
import AllUser from "../pages/dashboard/AllUser";
import ManageAppointment from "../pages/dashboard/ManageAppointment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourServices",
        element: <OurServices />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/appointment",
        element: (
          <PrivetRoute>
            <Appointment />
          </PrivetRoute>
        ),
      },
      {
        path: "/shortProfile/:_id",
        element: <ShortProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    children: [
      {
        path: "myAppointment",
        element: <MyAppointment></MyAppointment>,
      },
      // admin routs
      {
        path: "allUsers",
        element: <AllUser></AllUser>,
      },
      {
        path: "manageAppointments",
        element: <ManageAppointment></ManageAppointment>,
      },
    ],
  },
]);
