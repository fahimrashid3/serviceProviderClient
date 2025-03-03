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
import { TbLogs } from "react-icons/tb";
import { FcServices } from "react-icons/fc";
import useUsers from "../../../hooks/useUser";

const Navbar = () => {
  const [users] = useUsers();
  const [isAdmin] = useAdmin();
  const [isProvider] = useProvider();
  const [appointment] = useAppointment();
  const { user, logOut } = useAuth();
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
    <div className="bg-black bg-opacity-70 py-3 w-full z-[50] fixed">
      <div className="mx-auto max-w-[95%] md:max-w-[90%] lg:max-w-[85%]">
        <div className="navbar w-full">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-yellow lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black bg-opacity-50 rounded-box w-52"
              >
                <NavLinks></NavLinks>
              </ul>
            </div>
            <Link to="/">
              <div className="btn btn-ghost bg-transparent hover:bg-transparent flex flex-col md:flex-row ">
                <img src={""} className="hidden md:block rounded-md bg-white" />
                <h1 className="text-xl md:text-3xl font-bold text-white">
                  Service<span className="text-[#F7B801]">Providers</span>
                </h1>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">
              <NavLinks></NavLinks>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className=" pr-5 text-4xl dark:text-white dark:hover:text-gray-100 text-white hover:text-gray-300"
              >
                {users?.photoUrl ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full ring-primary ring-offset-primary-500 ring ring-offset-1">
                      <img src={users?.photoUrl} />
                    </div>
                  </div>
                ) : (
                  <CgProfile />
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-dark-900 text-white dark:bg-gray-400 dark:text-dark-900  rounded-box z-[1] w-64 p-2 shadow"
              >
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/dashboard/adminHome">
                        <FaHome /> Admin Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/addProviders">
                        <IoMdPersonAdd /> Add Providers
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/manageProviders">
                        <MdOutlineMenuOpen /> Manage Providers
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/manageReviews">
                        <BsEnvelopeExclamation /> Manage Reviews
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/manageContact">
                        <BsEnvelopeExclamation /> Manage Contacts
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/manageAppointments">
                        <FaCalendarCheck /> Manage Appointments
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/allUsers">
                        <FaUsers /> All Users
                      </Link>
                    </li>
                  </>
                )}
                {isProvider && (
                  <>
                    <li>
                      <Link to="/dashboard/providerHome">
                        <FaHome />
                        Provider Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/myServices">
                        <FcServices />
                        My Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/myAppointmentHistory">
                        <FaHistory />
                        My Appointment History
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/myBlogs">
                        <TbLogs />
                        My blogs
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/writeBlogs">
                        <FaEdit />
                        Write blogs
                      </Link>
                    </li>
                  </>
                )}
                {!isProvider && !isAdmin && (
                  <>
                    <li>
                      <Link to="/dashboard/userProfile">
                        <span className="text-2xl">
                          <CgProfile />
                        </span>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/userContact">
                        <span className="text-2xl">
                          <MdMessage />
                        </span>
                        Contact Messages
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/appointmentHistory">
                        <span className="text-2xl">
                          <FaHistory />
                        </span>
                        Appointment History
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/myAppointment">
                        <span className="text-2xl">
                          <FaRegCalendarCheck />
                        </span>
                        My Appointment
                        <div className="badge badge-secondary">
                          {appointment.length}
                        </div>
                      </Link>
                    </li>
                  </>
                )}

                <>
                  <li>
                    {user ? (
                      <p onClick={handelLogout}>
                        <span className="text-2xl font-semibold">
                          <CiLogout />{" "}
                        </span>
                        logout
                      </p>
                    ) : (
                      <Link to="/login">
                        <span className="text-2xl">
                          <FiLogIn />{" "}
                        </span>
                        Login
                      </Link>
                    )}
                  </li>
                </>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
