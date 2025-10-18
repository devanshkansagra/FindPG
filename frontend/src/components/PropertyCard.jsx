import { useState } from "react";

export function PropertyCard({pg}) {
    const [chatOpen, isChatOpen] = useState(false);
    function handleChat() {}
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <img
          src={pg.imageURL}
          alt={pg.propertyName}
          className="h-44 sm:h-full w-full object-cover sm:col-span-1"
        />
        <div className="p-4 sm:col-span-3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{pg.propertyName}</h3>
            <p className="text-gray-600 font-medium">Rs. {pg.price} onwards</p>
            <p className="text-gray-500 text-sm mt-1">{pg.location}</p>
            <p className="text-gray-400 text-xs mt-1">{pg.address}</p>
            <p className="text-gray-400 text-xs mt-1">
              <b>Amenities</b>
            </p>
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
            <p className="text-gray-400 text-xs mt-1">
              <b>Rules</b>
            </p>
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
            <button
              onClick={handleChat}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
            >
              Chat with Agent
            </button>
            {chatOpen && <Navigate to="/chat" />}
          </div>
        </div>
      </div>
    </div>
  );
}
