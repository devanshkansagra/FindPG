import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import Cookie from '../helpers/Cookie';
import { Navigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { PropertyCard } from './PropertyCard';

export default function Explore() {
  const url = `${import.meta.env.VITE_SERVER_ORIGIN}/api/property/get`;
  const { data, error } = useFetch(url);
  const listings = data?.data ?? [];
  const [toast, setToast] = useState({ show: false, message: '' }); // Toast state
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Filters */}
      <div className="bg-white shadow-md border-b py-4 px-6 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          {/* Dropdowns */}
          <div className="flex flex-wrap gap-3">
            <select className="border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Ahmedabad</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
            <select className="border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Occupancy: Both</option>
              <option>Boys</option>
              <option>Girls</option>
            </select>
            <select className="border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Budget</option>
              <option>Below ₹5,000</option>
              <option>₹5,000 - ₹10,000</option>
              <option>Above ₹10,000</option>
            </select>
            <select className="border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Amenities</option>
              <option>AC</option>
              <option>WiFi</option>
              <option>Food</option>
            </select>
          </div>

          {/* Apply Button */}
          <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow hover:bg-red-700 transition">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8">
        {/* Listings */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {listings.length} PGs Available
          </h2>

          {listings.map((pg) => (
            <div key={pg._id}>
              <PropertyCard pg={pg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
