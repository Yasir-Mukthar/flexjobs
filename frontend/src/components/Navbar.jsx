import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginUser, setLoginUser]= useState(false)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoginUser(true);
    }
  }, []); // Only run once on mount
 

  const navItems = [
    {
      path: "/",
      title: "Start a search",
    },
    {
      path: "/my-job",
      title: "My Jobs",
    },

    {
      path: "/post-job",
      title: "Post A Job",
    },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <span>FlexJobs</span>
        </a>

        {/* {nav for large screens} */}

        {loginUser && (
          <div className="hidden lg:flex space-x-5">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="text-base text-primary font-medium"
                activeClassName="active"
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        )}

        {/* {sin in and login button} */}

        {loginUser ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="py-2 px-5 border rounded hidden lg:block"
          >
            Log out
          </button>
        ) : (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
              Log in
            </Link>
            <Link
              to="/signup"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* {menu button for mobile} */}
        <div className="lg:hidden">
          <button onClick={handleMenu}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBars className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* {nav for mobile} */}
      <div
        className={`px-4 bg-black py-5 lg:hidden rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {isMenuOpen &&
            loginUser &&
            navItems.map((item, index) => (
              <li
                key={index}
                className="text-base text-white first:text-white py-1"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}

          {loginUser ? (
            <li className="text-white py-1">
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Log out
              </button>
            </li>
          ) : (
            <>
              <li className="text-white py-1">
                <Link to="/login">Log in</Link>
              </li>
              <li className="text-white py-1">
                <Link to="/signup">Sign in</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
