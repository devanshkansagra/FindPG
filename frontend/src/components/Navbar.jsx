import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from '../helpers/Cookie';
import { Bell } from 'lucide-react';
import { socket } from '../helpers/socket';

export function Navbar() {
  const navigate = useNavigate();

  const role = Cookie.get('role');
  const accessToken = Cookie.get('accessToken');

  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!accessToken) return;

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off('notification');
  }, [accessToken]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <header className="backdrop-blur-xl bg-red-600/80 text-white sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight hover:opacity-90 transition-all select-none"
          >
            FindPG
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium">
            <Link to="/explore" className="hover:text-gray-100 transition-all">
              Explore
            </Link>
            <a className="hover:text-gray-100 transition-all">Rent</a>
            <a className="hover:text-gray-100 transition-all">PG</a>
            <a className="hover:text-gray-100 transition-all">Hostels</a>
            <a className="hover:text-gray-100 transition-all">Help</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            {accessToken && (
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <Bell size={24} className="text-white drop-shadow-lg" />

                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] font-black rounded-full px-1.5 py-0.5 shadow-md animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
            )}

            {/* Agent Button */}
            {role === 'agent' && (
              <button
                onClick={() => navigate('/addPG')}
                className="bg-white/90 text-red-600 px-5 py-2 rounded-full font-semibold text-sm 
                     shadow-md hover:bg-white transition-all hover:shadow-lg active:scale-95"
              >
                Post Property
              </button>
            )}

            {/* Login / Logout */}
            {accessToken ? (
              <button
                onClick={handleLogout}
                className="bg-white/90 text-red-600 px-5 py-2 rounded-full font-semibold text-sm 
                     shadow-md hover:bg-white transition-all hover:shadow-lg active:scale-95"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-white/90 text-red-600 px-5 py-2 rounded-full font-semibold text-sm 
                     shadow-md hover:bg-white transition-all hover:shadow-lg active:scale-95"
              >
                Login
              </button>
            )}

            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
