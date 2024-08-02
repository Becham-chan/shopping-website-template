'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Register(){
    const {data: session} = useSession()

    useEffect(() => {
      if (session?.user?.email !== undefined) {router.replace("/")}
    }, [session]);
    
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        id: '',
        address: '',
        password: '',
        confirmedPassword: ''
      });

      const router = useRouter()
    
      const [errors, setErrors] = useState({});
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
      };
    
      const validateForm = () => {
        let formErrors = {};
        if (user.firstName.length === 0) formErrors.firstName = 'First name is required';
        if (user.lastName.length === 0) formErrors.lastName = 'Last name is required';
        if (user.username.length === 0) formErrors.username = 'Username is required';
        if (user.email.length === 0) formErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(user.email)) formErrors.email = 'Email is invalid';
        if (user.id.length !== 13) formErrors.id = 'ID is invalid';
        if (user.address.length === 0) formErrors.address = 'Address is required';
        if (user.password.length < 8 || user.confirmedPassword.length < 8) formErrors.password = 'Password length must be more than 8 characters';
        if (user.password != user.confirmedPassword) formErrors.password = 'Password and confirmed password doesn\'t match'
        return formErrors;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
          const {firstName, lastName, username, email, id, address, password} = user;
          console.log(firstName, lastName, username, email, id, address)
          try{
            const res = await fetch('http://localhost:3000/api/auth/register', {
              method: "POST",
              headers: {
                  "Content-Type": "application.json"
              },
              body: JSON.stringify ({
                  firstName, lastName, username, email, id, address, password
              }),
            })
            if (res.status === 200){
              router.replace("/auth/login")
            }
            else if (res.status === 400){
              setErrors({email: "Email already exists"});
            }        
            else if (res.status === 401){
              setErrors({username: "Username already exists"});
            }    
            else if (res.status === 402){
              setErrors({id : "Id already exists"})
            }    
            else{
              alert("Unknown error occured (500)")
            }
          }
          catch (err){
            alert("Unknown error occured (500)")
          }
        } else {
          setErrors(formErrors);
        }
      };
    
      return (
        <div className="container mx-auto p-6 max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">User Registration</h1>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                id="firstName"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                id="lastName"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                ID
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.id ? 'border-red-500' : ''}`}
                id="id"
                type="text"
                name="id"
                value={user.id}
                onChange={handleInputChange}
                placeholder="ID (13 Characters)"
              />
              {errors.id && <p className="text-red-500 text-xs italic">{errors.id}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Password (At least 8 Characters)"
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmedPassword">
                Confirmed Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmedPassword ? 'border-red-500' : ''}`}
                id="confirmedPassword"
                type="password"
                name="confirmedPassword"
                value={user.confirmedPassword}
                onChange={handleInputChange}
                placeholder="Confirmed Password"
              />
              {errors.confirmedPassword && <p className="text-red-500 text-xs italic">{errors.confirmedPassword}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                id="address"
                name="address"
                rows="3"
                value={user.address}
                onChange={handleInputChange}
                placeholder="Address"
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
            </div>
    
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      );
}