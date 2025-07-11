import { NavLink } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  return (
    <>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/ourServices"
        >
          Our Services
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/about"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/appointment"
        >
          Appointment
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={onClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-5 py-2 font-normal tracking-wide text-base lg:text-base flex items-center justify-center
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/blogs"
        >
          Blogs
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
