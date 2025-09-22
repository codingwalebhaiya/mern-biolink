import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
//import logo from "../../../public/images/logo.svg";

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between rounded-sm px-4 py-4 m-4 bg-slate-400  z-50 ">
      <div>
        <Link to="/">LinkHub</Link>
      </div>
      <div className="flex items-center gap-x-2">
        {token ? (
          <>
            <span>Welcome {user?.username}</span>

            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full  rounded-sm
                    border border-gray-300 shadow-sm px-4 py-2 bg-white 
                    text-sm font-medium text-gray-700 hover:bg-gray-50 
                    focus:outline-none"
                >
                  Click Here !
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="https://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-red-700  hover:text-white hover:cursor-pointer "
                      role="menuitem"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
          <button className="rounded-sm text-base font-medium ">
            <Link to="/login">Login</Link>
          </button>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
