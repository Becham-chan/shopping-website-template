'use client'

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Login(){
    const {data: session} = useSession()

    useEffect(() => {
      if (session?.user?.email !== undefined) {router.replace("/")}
    }, [session]);
    
    const [credentials, setCredentials] = useState({
        emailOrId: '',
        password: ''
    });

    const [emailOrId, setEmailOrID] = useState({})

    const router = useRouter();

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
      let formErrors = {};
      if (!credentials.emailOrId.trim()) formErrors.emailOrId = 'Email or ID is required';
      if (!credentials.password) formErrors.password = 'Password is required';
      return formErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        try{
          const user = credentials.emailOrId;
          const password = credentials.password
          console.log(user, password)
          const res = await signIn("credentials", {
            email: user, password: password, redirect: false
          })
          if (res.error){
            console.log("Invalid credentials")
            return
          }
          router.replace("/")
        }
        catch(err){
          console.log(err)
        }
      } else {
        setErrors(formErrors);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="emailOrId" className="sr-only">Email or ID</label>
                <input
                  id="emailOrId"
                  name="emailOrId"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email or ID"
                  value={credentials.emailOrId}
                  onChange={handleInputChange}
                />
                {errors.emailOrId && <p className="text-red-500 text-xs italic">{errors.emailOrId}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}