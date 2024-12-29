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
import AddProvider from "../pages/dashboard/AddProvider";
import ManageProviders from "../pages/dashboard/ManageProviders";
import AdminRoute from "./AdminRoute";
import FullProfile from "../pages/profile/FullProfile";
import ManageContact from "../pages/dashboard/ManageContact";
import ManageReviews from "../pages/dashboard/ManageReviews";
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
        path: "/ourServices/:category",
        element: <OurServices />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: (
          <PrivetRoute>
            <Contact />
          </PrivetRoute>
        ),
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
        path: "/fullProfile/:_id",
        element: <FullProfile />,
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
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "myAppointment",
        element: <MyAppointment />,
      },
      // admin routs
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "manageProviders",
        element: (
          <AdminRoute>
            <ManageProviders />
          </AdminRoute>
        ),
      },
      {
        path: "addProviders",
        element: (
          <AdminRoute>
            <AddProvider />
          </AdminRoute>
        ),
      },
      {
        path: "manageAppointments",
        element: (
          <AdminRoute>
            <ManageAppointment />
          </AdminRoute>
        ),
      },
      {
        path: "manageContact",
        element: (
          <AdminRoute>
            <ManageContact />
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);
