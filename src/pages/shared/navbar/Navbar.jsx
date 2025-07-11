import { Link } from "react-router-dom";
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
import { MdMessage, MdOutlineMenuOpen, MdMenu } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import useProvider from "../../../hooks/useProvider";
import { TbCategoryPlus, TbLogs } from "react-icons/tb";
import { FcServices } from "react-icons/fc";
import useUsers from "../../../hooks/useUser";
import { useState } from "react";
import NavLinks from "./NavLinks";

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

  return (
    <div className="px-4 sm:px-8 md:px-20 navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-[50] flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-2 min-w-0">
        <Link to="/" className="flex items-center gap-2 ml-2 min-w-0">
          <img
            src="/logo.png"
            alt="Service Provider Logo"
            className="h-10 sm:h-12 w-auto object-contain max-w-[500px]"
          />
        </Link>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <button
          className="sm:hidden text-3xl p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <MdMenu />
        </button>
        {/* NavLinks for desktop */}
        <div className="hidden sm:block">
          <NavLinks />
        </div>
        {/* Profile Icon & Dropdown */}
        <div className="relative">
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
      {/* Mobile nav links dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-base-100 shadow-md z-40 animate-fade-in">
          <NavLinks onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
