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
      className="flex items-center px-3  bg-red-500 text-white font-semibold 
                 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg 
                 active:bg-red-700 focus:outline-none focus:ring-2 
                 focus:ring-red-400 focus:ring-offset-2 transition duration-200"
      onClick={logoutHandler}
    >
      Logout <FiLogOut className="ml-2" />
    </button>
  );
}

export default LogoutBtn;
