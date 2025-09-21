import React from "react";
import { Plus, List, MessageSquare } from "lucide-react";

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-red-600 text-white py-3 sticky top-0 z-30 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">FindPG</span>
          </div>
          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#" className="hover:underline">Dashboard</a>
            <a href="#" className="hover:underline">My Listings</a>
            <a href="#" className="hover:underline">Add PG</a>
            <a href="#" className="hover:underline">Inquiries</a>
            <a href="#" className="hover:underline">Profile</a>
          </nav>
          <div>
            <button
              onClick={() => alert("Logged out")}
              className="ml-4 bg-white hover:bg-gray-100 text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Greeting */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, Agent 👋
          </h2>
          <p className="text-gray-500">
            Manage your PG listings, inquiries, and occupancy here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total PGs</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">12</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Current Occupancy</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">78%</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">New Inquiries</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">5</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Plus size={18} /> Add New PG
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <List size={18} /> View All Listings
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <MessageSquare size={18} /> Respond to Inquiries
            </button>
          </div>
        </div>

        {/* My Listings Preview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            My Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Boys PG near IT Park", price: "₹7,500/mo", img: "https://via.placeholder.com/400x250" },
              { name: "Girls Hostel - City Center", price: "₹8,200/mo", img: "https://via.placeholder.com/400x250" },
              { name: "Co-living PG for Professionals", price: "₹10,000/mo", img: "https://via.placeholder.com/400x250" },
            ].map((pg, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={pg.img} alt={pg.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{pg.name}</h3>
                  <p className="text-red-600 font-medium">{pg.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Inquiries
          </h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between">
              <span className="text-gray-700">
                Rahul Sharma - Interested in Boys PG
              </span>
              <a href="#" className="text-red-600 text-sm font-medium hover:underline">View</a>
            </li>
            <li className="py-4 flex justify-between">
              <span className="text-gray-700">
                Priya Verma - Wants Single Room with Meals
              </span>
              <a href="#" className="text-red-600 text-sm font-medium hover:underline">View</a>
            </li>
            <li className="py-4 flex justify-between">
              <span className="text-gray-700">
                Amit Singh - Looking near IT Park
              </span>
              <a href="#" className="text-red-600 text-sm font-medium hover:underline">View</a>
            </li>
          </ul>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>✅ You added <span className="font-medium">"Girls Hostel - City Center"</span></li>
            <li>✏️ You updated rent for <span className="font-medium">"Boys PG near IT Park"</span></li>
            <li>💬 You replied to an inquiry from <span className="font-medium">Rahul Sharma</span></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
