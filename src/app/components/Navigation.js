import "../globals.css";
import { useContext } from "react";

import { IoIosStats } from "react-icons/io";

import { authContext } from "../lib/store/auth-context";

function Navigation() {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex flex-row justify-between p-2">
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* User information */}
            {/* User Profile */}
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer" />
            </div>
            {/* Username */}
            <h1>
              <small>Hi, {user.displayName}!</small>
            </h1>
          </div>
        )}
        {/* Right side of Navigation */}
        {user && !loading &&(
          <div className="flex items-center gap-4">
            {/* Stats icon */}
            <a href="#stats">
            <div>
              <IoIosStats />
            </div>
            </a>
            {/* Sign out button */}
            <div>
              <button onClick={logout} className="btn btn-danger">Sign out</button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation;