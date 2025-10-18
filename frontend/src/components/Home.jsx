import React, { useState } from 'react';
import boysPg from '../assets/boys-pg.jpg';
import girlsPg from '../assets/girls-pg.jpg';
import studentFriendly from '../assets/student-friendly-pg.jpg';
import hostels from '../assets/hostels.png';
import wifi from '../assets/pg-with-wifi.jpeg';
import meals from '../assets/meals_included.png';
import forstudents from '../assets/for_students.png';
import singleRooms from '../assets/single_rooms.png';
import forProfessionals from '../assets/for_professionals.png';

import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useFetch } from '../hooks/useFetch';

export default function Home() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState('');

  const url = `${import.meta.env.VITE_SERVER_ORIGIN}/api/property/search?city=${cityName}`;
  const { data, error } = useFetch(url);
  async function handleSearchCity(e) {
    e.preventDefault();
    try {
      if (data) {
        navigate(`/search?city=${cityName}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Find a <span className="text-red-600">home away</span> from home
          </h1>
          <p className="mt-2 text-gray-600">Search PGs & Hostels near you</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="text"
              placeholder="Enter city or area"
              onChange={(e) => setCityName(e.target.value)}
              className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
            />
            <select className="w-full sm:w-48 border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Any Occupancy</option>
              <option>Single</option>
              <option>Double</option>
              <option>Triple</option>
            </select>
            <button
              onClick={handleSearchCity}
              className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
          Find a PG & Hostel in your area
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Student Friendly PGs', img: studentFriendly },
            { label: 'PG for Girls', img: girlsPg },
            { label: 'PG for Boys', img: boysPg },
            { label: 'Hostels', img: hostels },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            >
              <img src={cat.img} alt={cat.label} className="w-full h-40 object-cover" />
              <div className="p-5">
                <p className="text-lg font-semibold text-gray-800">{cat.label}</p>
                <a href="#" className="text-sm text-red-600 hover:underline mt-2 block">
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">20k+ Verified Listings</p>
            <p className="text-sm text-gray-600 mt-2">
              Choose from thousands of verified PGs and Hostels.
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">75,000+ Monthly Users</p>
            <p className="text-sm text-gray-600 mt-2">
              Trusted by students & professionals across India.
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">300+ Data Points</p>
            <p className="text-sm text-gray-600 mt-2">
              Helping you make the right choice with transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Handpicked Collections */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
          Explore our <span className="text-red-600">Handpicked Collections</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { categoryName: 'Wifi Included', img: wifi },
            { categoryName: 'Meals Included', img: meals },
            { categoryName: 'For Students', img: forstudents },
            { categoryName: 'For Professionals', img: forProfessionals },
            { categoryName: 'Single Rooms', img: singleRooms },
          ].map((c, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            >
              <img src={c.img} alt={c.categoryName} className="w-full h-44 object-cover" />
              <div className="p-5 text-lg font-semibold text-gray-800">{c.categoryName}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 StayFinder. All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-gray-800">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-800">
              Terms
            </a>
            <a href="#" className="hover:text-gray-800">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
