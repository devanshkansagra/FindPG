import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="bg-red-600 text-white py-3 sticky top-0 z-30 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold">FindPG</Link>
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
          <button className="ml-4 bg-white text-red-600 px-4 py-1.5 rounded-md text-sm font-medium">
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
  );
}
