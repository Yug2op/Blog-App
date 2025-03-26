import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "My Post", slug: "/my-post", active: authStatus },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-900 text-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-3 px-4 md:px-6 relative ">

          {/* Logo (Left) */}
          <div className="flex items-center ">
            
              <Logo width="50px" className="sm:w-16 md:w-20" />
           
          </div>

          {/* Desktop Navigation Links (Right) */}
          <ul className="hidden md:flex space-x-5 lg:space-x-7">
            {navItems.map(
              (item) =>
                (item.active === undefined || item.active) && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className={`pb-1 transition-colors duration-200 text-base lg:text-lg font-medium ${location.pathname === item.slug
                          ? "text-red-400 border-b-2 border-red-400"
                          : "text-white hover:text-blue-300"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-indigo-300 outline-none focus:outline-none active:bg-transparent focus:bg-transparent"
              aria-label="Open Menu"
              onClick={toggleMenu}
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="lightgreen"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <ul className="absolute top-14 right-2 bg-gray-800 text-white w-56 p-4 rounded-lg shadow-lg space-y-3 z-50">
              {navItems.map(
                (item) =>
                  (item.active === undefined || item.active) && (
                    <li key={item.name}>
                      <Link
                        to={item.slug}
                        className="block text-base md:text-lg font-medium hover:text-indigo-300 transition-colors duration-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;