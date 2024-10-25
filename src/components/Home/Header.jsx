import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFirebase } from "../../utility/Storage";
import UserIcon from "../../pages/UserIcon";
import logo from "../../assets/logo.png"; // Update the logo to match "SEVA"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const Firebase = useFirebase();

  return (
    <nav className="bg-teal-900 fixed w-full z-20 top-0 border-b border-gray-700 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3">
          <img src={logo} className="h-10 text-white" alt="SEVA Logo" />
          <span className="text-white text-xl font-bold">SEVA</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          {Firebase.isLogin ? (
            <UserIcon />
          ) : (
            <NavLink
              to={!Firebase.isLogin && "/auth?mode=login"}
              className="text-white focus:ring-4 focus:outline-none bg-primary-color hover:bg-teal-700 font-bold rounded-lg text-sm px-4 py-2 text-center transition-colors duration-500"
            >
              Login
            </NavLink>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-teal-800 md:space-x-8 md:flex-row md:mt-0 md:bg-teal-900">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-color font-bold"
                    : "block py-2 text-white rounded hover:bg-teal-800 md:hover:bg-transparent md:hover:text-secondary-color transition-colors duration-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-color font-bold"
                    : "block py-2 text-white rounded hover:bg-teal-800 md:hover:bg-transparent md:hover:text-secondary-color transition-colors duration-500"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-color font-bold"
                    : "block py-2 text-white rounded hover:bg-teal-800 md:hover:bg-transparent md:hover:text-secondary-color transition-colors duration-500"
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-color font-bold"
                    : "block py-2 text-white rounded hover:bg-teal-800 md:hover:bg-transparent md:hover:text-secondary-color transition-colors duration-500"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/developers"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-color font-bold"
                    : "block py-2 text-white rounded hover:bg-teal-800 md:hover:bg-transparent md:hover:text-secondary-color transition-colors duration-500"
                }
              >
                Developers
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
