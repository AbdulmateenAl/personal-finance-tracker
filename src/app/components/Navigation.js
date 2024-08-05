import "../globals.css";
import { IoIosStats } from "react-icons/io";

function Navigation() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex flex-row justify-between p-2">
        <div className="flex items-center gap-2">
          {/* User information */}
          {/* User Profile */}
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <img
            src="http://thispersondoesnotexist.com/"
            width={70}
            height={70}
            alt="User profile picture" />
          </div>
          {/* Username */}
          <h1>
            <small>Hi, John Doe</small>
          </h1>
          </div>
          {/* Right side of Navigation */}
          <div className="flex items-center gap-4">
            {/* Stats icon */}
            <div>
              <IoIosStats />
            </div>
            {/* Sign out button */}
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation;