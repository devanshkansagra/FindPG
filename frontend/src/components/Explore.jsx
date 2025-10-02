import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import Cookie from "../helpers/Cookie";

export default function Explore() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        import.meta.env.VITE_SERVER_ORIGIN + "/api/property/get"
      );
      const data = await res.json();
      setListings(data.data);
    }

    fetchData();
  }, [setListings]);

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
            {listings.length} PGs Available in Ahmedabad
          </h2>

          {listings.map((pg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4">
                {/* Image */}
                <img
                  src={pg.imageURL}
                  alt={pg.propertyName}
                  className="h-44 sm:h-full w-full object-cover sm:col-span-1"
                />
                {/* Info */}
                <div className="p-4 sm:col-span-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {pg.propertyName}
                    </h3>
                    <p className="text-gray-600 font-medium">Rs. {pg.price} onwards</p>
                    <p className="text-gray-500 text-sm mt-1">{pg.location}</p>
                    <p className="text-gray-400 text-xs mt-1">{pg.address}</p>
                    <p className="text-gray-400 text-xs mt-1"><b>Amenities</b></p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pg.amenities.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs mt-1"><b>Rules</b></p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pg.rules.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
                      View Details.
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200">
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
