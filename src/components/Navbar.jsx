import { useContext } from "react";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-12" src={logo} alt="" />
          <span className="font-bold text-xl">SoloBids</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>
            <NavLink className="rounded-sm" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="rounded-sm" to="/jobs">
              All Jobs
            </NavLink>
          </li>

          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded w-52 gap-1"
            >
              <li>
                <NavLink to="/add-job" className="justify-between rounded-sm">
                  Add Job
                </NavLink>
              </li>
              <li>
                <NavLink className="rounded-sm" to="/my-posted-jobs">
                  My Posted Jobs
                </NavLink>
              </li>
              <li>
                <NavLink className="rounded-sm" to="/my-bids">
                  My Bids
                </NavLink>
              </li>
              <li>
                <NavLink className="rounded-sm" to="/bid-requests">
                  Bid Requests
                </NavLink>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-red-500 hover:bg-red-600 text-white block rounded-sm text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
