import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', slug: '/' },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    // { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'My Post', slug: '/my-post', active: authStatus },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-900 text-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-1 ">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/">
              <h2 className='text-2xl font-bold text-pink-400 hover:text-pink-600 transition-colors duration-200'
              >Blog App</h2>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 ">
            {navItems.map(
              (item) =>
                (item.active === undefined || item.active) && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      
                      className={`text-lg font-medium pb-1 transition-colors duration-200 
                        ${
                          location.pathname === item.slug
                            ? 'text-red-500'
                            : 'text-white hover:text-blue-300'
                        }
                      `}
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
              className="text-white hover:text-indigo-300"
              aria-label="Open Menu"
              onClick={toggleMenu}
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <ul className="absolute top-16 right-0 bg-gray-800 text-white w-full p-4 space-y-4 z-50">
              {navItems.map(
                (item) =>
                  (item.active === undefined || item.active) && (
                    <li key={item.name}>
                      <Link
                        to={item.slug}
                        className="block text-lg font-medium no-underline hover:text-indigo-300 transition-colors duration-500"
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
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
