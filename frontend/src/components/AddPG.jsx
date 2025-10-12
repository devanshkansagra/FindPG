import AgentDashboardNavbar from './AgentDashboardNavbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from '../helpers/Cookie'

export default function AddPG() {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [rules, setRules] = useState([]);
  const [agentName, setAgentName] = useState('');
  const [phone, setPhone] = useState(0);
  const [ownerPhone, setOwnerPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('propertyName', propertyName);
      formData.append('propertyType', propertyType);
      formData.append('price', price);
      formData.append('deposit', deposit);
      formData.append('location', location);
      formData.append('address', address);

      amenities.forEach((a) => formData.append('amenities[]', a));
      rules.forEach((r) => formData.append('rules[]', r));

      formData.append('agentName', agentName);
      formData.append('phone', phone);
      formData.append('ownerPhone', ownerPhone);
      formData.append('email', email);
      formData.append('image', image);

      const accessToken = Cookie.get('accessToken');
      const res = await fetch(import.meta.env.VITE_SERVER_ORIGIN + '/api/property/add', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
        body: formData,
        credentials: 'include',
      });

      if (res.status === 201) {
        // navigate("/my-listings");
        navigate('/AgentDashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((a) => a !== value));
    }
  };
  function handleRulesChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setRules([...rules, value]);
    } else {
      setRules(rules.filter((val) => val != value));
    }
  }

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  return (
    <>
      <AgentDashboardNavbar />
      <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New PG / Hostel</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Name</label>
              <input
                type="text"
                placeholder="Ex: Sunshine PG"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPropertyName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  placeholder="City / Area"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Address</label>
              <textarea
                rows="2"
                placeholder="Street, Landmark, City"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (per month)</label>
                <input
                  type="number"
                  placeholder="5000"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deposit</label>
                <input
                  type="number"
                  placeholder="10000"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDeposit(Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {['WiFi', 'AC', 'Food', 'Parking'].map((item) => (
                  <label key={item} className="block">
                    <input
                      type="checkbox"
                      value={item}
                      checked={amenities.includes(item)}
                      onChange={handleAmenityChange}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rules</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {[
                  'Boys Only',
                  'Girls Only',
                  'Boys and Girls',
                  'Smoking Allowed',
                  'Drinking Allowed',
                  'Visitors Allowed',
                ].map((rule) => (
                  <label key={rule} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={rule}
                      className="rounded text-blue-600"
                      onChange={handleRulesChange}
                    />
                    <span>{rule}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="mt-2 block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500"
                onChange={handleFileSelected}
              />
              <p className="mt-1 text-sm text-gray-500">
                You can upload multiple images (JPG, PNG).
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Agent / Broker Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setAgentName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPhone(Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Phone</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setOwnerPhone(Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="agent@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition"
                onClick={handleSubmit}
              >
                Add PG
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
