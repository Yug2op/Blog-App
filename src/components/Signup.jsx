import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-800 rounded-xl p-8 sm:p-10 md:p-12 border border-gray-700 shadow-lg">
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-20 sm:w-24 md:w-28">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-400 transition-all duration-200 hover:text-blue-500"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center text-sm sm:text-base">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-4 sm:space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 px-4 py-2 sm:py-3"
              {...register('name', { required: true })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 px-4 py-2 sm:py-3"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-700 text-gray-200 placeholder-gray-400 px-4 py-2 sm:py-3"
              {...register('password', { required: true })}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 text-gray-100 hover:bg-blue-700 transition-all duration-200 py-2 sm:py-3 text-sm sm:text-base font-medium"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
