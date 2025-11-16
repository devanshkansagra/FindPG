import { useSearchParams } from 'react-router-dom';
import AgentDashboardNavbar from './AgentDashboardNavbar';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Cookie from '../helpers/Cookie';
import { Navbar } from './Navbar';

export default function EnquiryForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('id');

  const formData = new FormData();
  formData.append('fullName', fullName);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('message', message);
  formData.append('propertyName', propertyName);
  formData.append('budget', budget);
  formData.append('propertyType', propertyType);

  const accessToken = Cookie.get('accessToken');

  const data = {
    fullName,
    userEmail: email,
    phone,
    message,
    propertyName,
    propertyType,
    budget,
    propertyId,
  };
  async function sendEnquiry(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/enquiry/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const data2 = await res.json();

      if (data2.statusCode === 200) {
        window.alert(data2.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            PG / Hostel Enquiry Form
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Property Name</label>
              <input
                type="text"
                placeholder="Property Name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget (per month)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 8000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="3"
                placeholder="Tell us more about your requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={sendEnquiry}
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition"
              >
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
