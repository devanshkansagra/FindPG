import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from '../helpers/Cookie';

export function Navbar() {
  const navigate = useNavigate();

  const role = Cookie.get('role');
  const accessToken = Cookie.get('accessToken');

  async function handleLogout(e) {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_ORIGIN + `/api/user/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-red-600 text-white py-3 sticky top-0 z-30 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold">
              FindPG
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/explore" className="hover:text-gray-200">
              Explore
            </Link>
            <a href="#" className="hover:text-gray-200">
              Rent
            </a>
            <a href="#" className="hover:text-gray-200">
              PG
            </a>
            <a href="#" className="hover:text-gray-200">
              Hostels
            </a>
            <a href="#" className="hover:text-gray-200">
              Help
            </a>
          </nav>
          <div>
            {role === 'agent' ? (
              <button
                onClick={() => navigate('/addPG')}
                className="ml-4 bg-white text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
              >
                Post Property
              </button>
            ) : (
              <></>
            )}
            {accessToken ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-white hover:cursor-pointer text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="ml-4 bg-white hover:cursor-pointer text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
