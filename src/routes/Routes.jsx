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
import Checkout from "../pages/dashboard/Checkout";
import Success from "../pages/payment/Success";
import Cancel from "../pages/payment/Cancel";
import MyServices from "../pages/dashboard/MyServices";
import AdminProfile from "../pages/dashboard/profile/AdminProfile";
import ProviderProfile from "../pages/dashboard/profile/ProviderProfile";
import UserProfile from "../pages/dashboard/profile/UserProfile";
import AssignProvider from "../components/AssignProvider";
import Room from "../pages/dashboard/Room";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import MyReviews from "../pages/dashboard/MyReviews";
import ErrorPage from "../pages/shared/errorPage/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/fail",
        element: <Cancel />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
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
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      // provider routs
      {
        path: "myServices",
        element: <MyServices />,
      },
      {
        path: "providerHome",
        element: <ProviderProfile />,
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
        path: "assignProvider/:_id",
        element: (
          <AdminRoute>
            <AssignProvider />
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
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminProfile />
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
