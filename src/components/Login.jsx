import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
      <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 shadow-lg border border-gray-700">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-400 hover:text-blue-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-6 text-center text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            className="bg-gray-700 text-gray-200 placeholder-gray-400"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
             className="bg-gray-700 text-gray-200 placeholder-gray-400"
            {...register('password', {
              required: true,
            })}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
