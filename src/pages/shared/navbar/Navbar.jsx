import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAppointment from "../../../hooks/useAppointment";

const Navbar = () => {
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
      confirmButtonText: "Yes, delete it!",
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
    <div className="bg-black bg-opacity-70 py-3 w-full z-[50] fixed">
      <div className=" max-w-7xl mx-auto">
        <div className="navbar  w-full">
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
                className=" pr-5 text-4xl dark:text-dark-900 dark:hover:text-dark-700 text-white hover:text-gray-300"
              >
                <CgProfile />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-dark-900 text-white dark:bg-gray-400 dark:text-dark-900  rounded-box z-[1] w-64 p-2 shadow"
              >
                <li>
                  <Link to="/userProfile">
                    <span className="text-2xl">
                      <CgProfile />
                    </span>{" "}
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/myAppointment">
                    <span className="text-2xl">
                      <FaRegCalendarCheck />
                    </span>{" "}
                    My Appointment
                    <div className="badge badge-secondary">
                      {appointment.length}
                    </div>
                  </Link>
                </li>

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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;