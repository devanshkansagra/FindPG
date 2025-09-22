import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [image, setImage] = useState();
  const [tags, setTags] = useState("");

  async function handleSubmitProperty(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("propertyName", propertyName);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("distance", distance);
      formData.append("image", image);
      formData.append("tags", tags);

      const res = await fetch(
        import.meta.env.VITE_SERVER_ORIGIN + "/api/property/add",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <>
      {/* Navbar */}
      <header className="bg-red-600 text-white py-3 sticky top-0 z-30 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold">
              FindPG
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/explore" className="hover:text-gray-200">
              Explore
            </Link>
            <a href="#" className="hover:text-gray-200">
              Rent
            </a>
            <a href="#" className="hover:text-gray-200">
              PG
            </a>
            <a href="#" className="hover:text-gray-200">
              Hostels
            </a>
            <a href="#" className="hover:text-gray-200">
              Help
            </a>
          </nav>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-4 bg-white text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Post Property
            </button>
            <button
              onClick={() => navigate("/login")}
              className="ml-4 bg-white hover:cursor-pointer text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Post a Property
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="Balaji Homes Only for Boys PG"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="₹11,000"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Thaltej, Ahmedabad"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Distance
                </label>
                <input
                  type="text"
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="0.1 Km from Udgam School"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Property Image
                </label>
                <input
                  type="file"
                  onChange={fileSelected}
                  accept="image/*"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags (space seprated)
                </label>
                <input
                  type="text"
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Food Included, Beds Available, AC"
                  className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                onClick={handleSubmitProperty}
              >
                Submit Property
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
