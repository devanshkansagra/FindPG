import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Cookie from '../helpers/Cookie';
import { Navbar } from '../components/Navbar';
import { MapPin, Home, Shield, Phone, Mail, IndianRupee, Bed, Star } from 'lucide-react';
import { useState } from 'react';
import AddReviewModal from './AddReviewModal';

export function ViewDetails() {
  const { id } = useParams();
  const url = `${import.meta.env.VITE_SERVER_ORIGIN}/api/property/get/${id}`;
  const accessToken = Cookie.get('accessToken');
  const { data, error } = useFetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: reviewData } = useFetch(
    import.meta.env.VITE_SERVER_ORIGIN + `/api/property/${id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const [showModal, setShowModal] = useState(false);

  const propertyData = data?.data ?? null;
  const reviews = reviewData?.data ?? [];

  if (!propertyData)
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-500 text-lg animate-pulse">Loading property details...</p>
        </div>
      </>
    );

  const handleApply = () => {
    alert(`You have applied for ${propertyData.propertyName}!`);
    // 🧠 Later you can replace this with navigation to /apply/:id or an API call.
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        {/* Hero Section */}
        <div className="relative w-full h-[460px]">
          <img
            src={propertyData.imageURL}
            alt={propertyData.propertyName}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-4xl font-bold">{propertyData.propertyName}</h1>
            <p className="text-gray-200 flex items-center gap-2 mt-2">
              <MapPin size={18} /> {propertyData.location}
            </p>
          </div>
        </div>

        {/* Property Info Card */}
        <div className="max-w-6xl mx-auto -mt-16 px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {propertyData.propertyType}
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  {propertyData.propertyName}
                </h2>
              </div>
              <div className="text-right mt-5 md:mt-0">
                <p className="text-2xl font-bold text-red-600 flex items-center justify-end gap-1">
                  <IndianRupee size={18} /> {propertyData.price.toLocaleString()}
                  <span className="text-gray-500 text-base font-normal"> /month</span>
                </p>
                <p className="text-gray-600 text-sm">Deposit: ₹{propertyData.deposit}</p>
              </div>
            </div>

            {/* 🔹 Apply Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleApply}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
              >
                Apply Now
              </button>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Address */}
            <div className="flex items-start gap-3">
              <Home className="text-red-500 mt-1" size={20} />
              <div>
                <h3 className="text-lg font-semibold mb-1">Address</h3>
                <p className="text-gray-700 leading-relaxed">{propertyData.address}</p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {propertyData.additionalImages?.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-44 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities & Rules */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
                <Bed size={20} /> Amenities
              </h2>
              <div className="flex flex-wrap gap-3">
                {propertyData.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
                <Shield size={20} /> Rules
              </h2>
              <div className="flex flex-wrap gap-3">
                {propertyData.rules.map((rule, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Temporary Google Map Placeholder */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <MapPin size={20} className="text-red-500" />
              Location & Directions
            </h2>
            <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200">
              <iframe
                title="Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  propertyData.address
                )}&output=embed`}
              ></iframe>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Tenant Reviews</h2>
              <div>{'(' + reviews.length + ') reviews'}</div>

              {/* Add Review Button */}
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-700 transition"
              >
                Add Review
              </button>
            </div>
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(review.date).toLocaleString('en-IN').split(',')[0]}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Info */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Agent Information</h2>
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{propertyData.agentName}</p>
                <p className="text-sm text-gray-500">Verified Agent</p>
              </div>
              <div className="flex flex-col gap-1 text-gray-700">
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-green-600" /> {propertyData.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" /> Owner: {propertyData.ownerPhone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-red-500" /> {propertyData.email}
                </p>
              </div>
            </div>
          </div>
          {showModal && <AddReviewModal showModal={showModal} setShowModal={setShowModal} />}
          <footer className="text-center text-gray-400 text-sm mt-10 py-6">
            © {new Date().getFullYear()} FindPG — All Rights Reserved
          </footer>
        </div>
      </div>
    </>
  );
}
