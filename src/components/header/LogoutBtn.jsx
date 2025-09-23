import React from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'; // Import toast
import authService from '../../services/authService'; // Updated import path
import { logout } from '../../store/authSlice';
import { FiLogOut } from 'react-icons/fi';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      toast.success('Logged out successfully!'); // Toast on successful logout
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error || "An unknown error occurred during logout."); // Toast on error
    }
  };

  return (
    <button
      className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 text-sm border border-red-500 text-red-500 font-semibold rounded-full shadow-sm
                 hover:bg-red-500 hover:text-white hover:shadow-md active:bg-red-600
                 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
      onClick={logoutHandler}
      aria-label="Logout"
    >
      <span className="hidden sm:inline">Logout</span>
      <FiLogOut className="text-lg sm:text-xl" />
    </button>
  );
}

export default LogoutBtn;
