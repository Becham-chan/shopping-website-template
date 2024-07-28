'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function Profile(){
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
      async function fetchAPI(){
        const email = session?.user?.email
        if (email === undefined){
          router.replace("/")
          return
        }
        console.log(email)
        const data = {}
          const res = await fetch('http://localhost:3000/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify ({
              email
            }),
        })
        const result = await res.json()
        console.log(result)
        data.id = result.user.id
        data.username = result.user.username
        data.email = email
        data.address = result.user.address
        console.log(data)
        setUser(data)
      }
      fetchAPI()
    }, [session]);

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});

    // console.log(session?.user?.email)
    // const userData = await fetch('http://localhost:3000/api/auth/register', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application.json"
    //     },
    //     body: JSON.stringify ({
    //         firstName, lastName, username, email, id, address, password
    //     }),
    // })

    const [editedUser, setEditedUser] = useState({ ...user });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setUser(editedUser);
      setIsEditing(false);
    };

    console.log(session)

    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    name="address"
                    rows="3"
                    value={editedUser.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      setEditedUser({ ...user });
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-600">User ID</p>
                  <p>{user.id}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-600">Username</p>
                  <p>{user.username}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-600">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-600">Address</p>
                  <p>{user.address}</p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
}