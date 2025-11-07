import React, { useEffect } from 'react';
import { Plus, List, MessageSquare } from 'lucide-react';
import AgentDashboardNavbar from './AgentDashboardNavbar';
import { useFetch } from '../hooks/useFetch';
import Cookie from '../helpers/Cookie';

export default function AgentDashboard() {
  const accessToken = Cookie.get('accessToken');
  const { data: enquiries } = useFetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/enquiry/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const enquiryRecords = enquiries?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AgentDashboardNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome, Agent 👋</h2>
          <p className="text-gray-500">Manage your PG listings, inquiries, and occupancy here.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">My Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Boys PG near IT Park',
                price: '₹7,500/mo',
                img: 'https://via.placeholder.com/400x250',
              },
              {
                name: 'Girls Hostel - City Center',
                price: '₹8,200/mo',
                img: 'https://via.placeholder.com/400x250',
              },
              {
                name: 'Co-living PG for Professionals',
                price: '₹10,000/mo',
                img: 'https://via.placeholder.com/400x250',
              },
            ].map((pg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <img src={pg.img} alt={pg.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{pg.name}</h3>
                  <p className="text-red-600 font-medium">{pg.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Inquiries</h2>
          <ul className="divide-y divide-gray-200">
            {enquiryRecords.map((enquiry) => (
              <li className="py-4 flex justify-between" key={enquiry._id}>
                <span className="text-gray-700">
                  {enquiry.fullName} - Interested in {enquiry.propertyType}
                </span>
                <a href="#" className="text-red-600 text-sm font-medium hover:underline">
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              ✅ You added <span className="font-medium">"Girls Hostel - City Center"</span>
            </li>
            <li>
              ✏️ You updated rent for <span className="font-medium">"Boys PG near IT Park"</span>
            </li>
            <li>
              💬 You replied to an inquiry from <span className="font-medium">Rahul Sharma</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
