import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { FiLogOut } from 'react-icons/fi';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 
                 text-white font-semibold rounded-full shadow-md 
                 hover:bg-red-600 hover:shadow-lg active:bg-red-700 
                 focus:outline-none focus:ring-2 focus:ring-red-400 
                 transition duration-200"
      onClick={logoutHandler}
      aria-label="Logout"
    >
      <span className="hidden sm:inline">Logout</span>
      <FiLogOut className="text-lg sm:text-xl" />
    </button>
  );
}

export default LogoutBtn;
