import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAppointment from "../../../hooks/useAppointment";
import useAdmin from "../../../hooks/useAdmin";
import {
  FaCalendarCheck,
  FaEdit,
  FaHistory,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { BsEnvelopeExclamation } from "react-icons/bs";
import { MdMessage, MdOutlineMenuOpen } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import useProvider from "../../../hooks/useProvider";
import { TbCategoryPlus, TbLogs } from "react-icons/tb";
import { FcServices } from "react-icons/fc";
import useUsers from "../../../hooks/useUser";
import { useState } from "react";

const Navbar = () => {
  const [users] = useUsers();
  const [isAdmin] = useAdmin();
  const [isProvider] = useProvider();
  const [appointment] = useAppointment();
  const { user, logOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // console.log(user && user.photoURL);
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-[50]">
      {/* Navbar Start: Logo + Mobile Dropdown */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open mobile menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {/* Mobile Dropdown Content */}
          {mobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <NavLinks />
              <li className="mt-2 border-t pt-2">
                {user ? (
                  <button
                    onClick={handelLogout}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50 w-full text-left text-base"
                  >
                    <CiLogout className="text-2xl font-semibold" />{" "}
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiLogIn className="text-2xl" /> <span>Login</span>
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          <img
            src="/logo.png"
            alt="Service Provider Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>
      {/* Navbar Center: Desktop NavLinks */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      {/* Navbar End: Profile/Actions */}
      <div className="navbar-end">
        {/* Desktop Profile Dropdown */}
        <div className="hidden md:block relative">
          <button
            tabIndex={0}
            className="text-4xl text-gray-900 hover:text-primary-600 p-1 rounded-full focus:outline-none border-2 border-primary-100"
            aria-label="Profile menu"
            onClick={() => setProfileOpen((v) => !v)}
          >
            {users?.photoUrl ? (
              <div className="avatar">
                <div className="w-10 rounded-full border-2 border-primary-600">
                  <img src={users?.photoUrl} alt="User avatar" />
                </div>
              </div>
            ) : (
              <CgProfile />
            )}
          </button>
          {/* Dropdown */}
          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/adminHome"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHome className="text-lg" /> <span>Admin Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/addProviders"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <IoMdPersonAdd className="text-lg" />{" "}
                      <span>Add Providers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/AddCategory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <TbCategoryPlus className="text-lg" />{" "}
                      <span>Add Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageProviders"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <MdOutlineMenuOpen className="text-lg" />{" "}
                      <span>Manage Providers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageReviews"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <BsEnvelopeExclamation className="text-lg" />{" "}
                      <span>Manage Reviews</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageContact"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <BsEnvelopeExclamation className="text-lg" />{" "}
                      <span>Manage Contacts</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageAppointments"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaCalendarCheck className="text-lg" />{" "}
                      <span>Manage Appointments</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/allUsers"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaUsers className="text-lg" /> <span>All Users</span>
                    </Link>
                  </li>
                </>
              )}
              {isProvider && (
                <>
                  <li>
                    <Link
                      to="/dashboard/providerHome"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHome className="text-lg" />{" "}
                      <span>Provider Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myServices"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FcServices className="text-lg" />{" "}
                      <span>My Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myAppointmentHistory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHistory className="text-lg" />{" "}
                      <span>My Appointment History</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myBlogs"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <TbLogs className="text-lg" /> <span>My blogs</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/writeBlogs"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaEdit className="text-lg" /> <span>Write blogs</span>
                    </Link>
                  </li>
                </>
              )}
              {!isProvider && !isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/userProfile"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <CgProfile className="text-2xl" /> <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/userContact"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <MdMessage className="text-2xl" />{" "}
                      <span>Contact Messages</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/appointmentHistory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHistory className="text-2xl" />{" "}
                      <span>Appointment History</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myAppointment"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaRegCalendarCheck className="text-2xl" />{" "}
                      <span>My Appointment</span>
                      <div className="badge badge-secondary ml-2">
                        {appointment.length}
                      </div>
                    </Link>
                  </li>
                </>
              )}
              <>
                <li>
                  {user ? (
                    <button
                      onClick={handelLogout}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50 w-full text-left"
                    >
                      <CiLogout className="text-2xl font-semibold" />{" "}
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FiLogIn className="text-2xl" /> <span>Login</span>
                    </Link>
                  )}
                </li>
              </>
            </ul>
          )}
        </div>
        {/* Mobile Profile Icon */}
        <div className="flex md:hidden relative">
          <button
            tabIndex={0}
            className="text-3xl text-gray-900 hover:text-primary-600 p-1 rounded-full focus:outline-none border-2 border-primary-100"
            aria-label="Profile menu"
            onClick={() => setProfileOpen((v) => !v)}
          >
            {users?.photoUrl ? (
              <div className="avatar">
                <div className="w-9 rounded-full border-2 border-primary-600">
                  <img src={users?.photoUrl} alt="User avatar" />
                </div>
              </div>
            ) : (
              <CgProfile />
            )}
          </button>
          {/* Dropdown for mobile */}
          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/adminHome"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHome className="text-lg" /> <span>Admin Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/addProviders"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <IoMdPersonAdd className="text-lg" />{" "}
                      <span>Add Providers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/AddCategory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <TbCategoryPlus className="text-lg" />{" "}
                      <span>Add Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageProviders"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <MdOutlineMenuOpen className="text-lg" />{" "}
                      <span>Manage Providers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageReviews"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <BsEnvelopeExclamation className="text-lg" />{" "}
                      <span>Manage Reviews</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageContact"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <BsEnvelopeExclamation className="text-lg" />{" "}
                      <span>Manage Contacts</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manageAppointments"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaCalendarCheck className="text-lg" />{" "}
                      <span>Manage Appointments</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/allUsers"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaUsers className="text-lg" /> <span>All Users</span>
                    </Link>
                  </li>
                </>
              )}
              {isProvider && (
                <>
                  <li>
                    <Link
                      to="/dashboard/providerHome"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHome className="text-lg" />{" "}
                      <span>Provider Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myServices"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FcServices className="text-lg" />{" "}
                      <span>My Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myAppointmentHistory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHistory className="text-lg" />{" "}
                      <span>My Appointment History</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myBlogs"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <TbLogs className="text-lg" /> <span>My blogs</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/writeBlogs"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaEdit className="text-lg" /> <span>Write blogs</span>
                    </Link>
                  </li>
                </>
              )}
              {!isProvider && !isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/userProfile"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <CgProfile className="text-2xl" /> <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/userContact"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <MdMessage className="text-2xl" />{" "}
                      <span>Contact Messages</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/appointmentHistory"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaHistory className="text-2xl" />{" "}
                      <span>Appointment History</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myAppointment"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FaRegCalendarCheck className="text-2xl" />{" "}
                      <span>My Appointment</span>
                      <div className="badge badge-secondary ml-2">
                        {appointment.length}
                      </div>
                    </Link>
                  </li>
                </>
              )}
              <>
                <li>
                  {user ? (
                    <button
                      onClick={handelLogout}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50 w-full text-left"
                    >
                      <CiLogout className="text-2xl font-semibold" />{" "}
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-primary-50"
                    >
                      <FiLogIn className="text-2xl" /> <span>Login</span>
                    </Link>
                  )}
                </li>
              </>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
