import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaDollarSign,
  FaHome,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

const DashBoard = () => {
  // todo : get isAdmin value from database
  const isAdmin = false;
  return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
     {/* dashboard content */}
      {/* <div className="flex-grow md:p-10"> */}
      <div className="flex-grow p-10 overflow-y-auto h-screen">
        <Outlet></Outlet>
      </div>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    {/* <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4"> */}
      {/* Sidebar content here */}
      
      {/* dashboard side bar */}
      <div className="w-96 min-h-screen bg-[#D1A054] p-5 pt-10 text-black">
        <ul className="menu text-lg">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProviders">
                  <IoMdPersonAdd />
                  add Providers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProviders">
                  <MdOutlineMenuOpen></MdOutlineMenuOpen>
                  Manage Providers
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageAppointments">
                  <FaCalendarCheck />
                  Manage Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAppointment">
                  <FaCalendar></FaCalendar>
                  My Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaDollarSign></FaDollarSign>
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          {/* shared nav */}
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ourServices">
              <MdOutlineMenuOpen />
              Our Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointment">
              <FaCalendar></FaCalendar>
              Appointment
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaPhone></FaPhone>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
     
  </div>
</div>





  );
};

export default DashBoard;
