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
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-96 min-h-screen bg-primary-300 p-5 pt-10">
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
      {/* dashboard content */}
      {/* <div className="flex-grow md:p-10"> */}
      <div className="flex-grow p-10 overflow-y-auto h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
