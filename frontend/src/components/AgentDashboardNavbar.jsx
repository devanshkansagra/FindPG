import { Link, useNavigate } from 'react-router-dom';

export default function AgentDashboardNavbar() {
  const navigate = useNavigate();
  async function handleLogout(e) {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_ORIGIN + `/api/user/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-red-600 text-white py-3 sticky top-0 z-30 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold">
            FindPG
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/AgentDashboard" className="hover:underline">
            Dashboard
          </Link>
          <a href="#" className="hover:underline">
            My Listings
          </a>
          <Link to="/addPG" className="hover:underline">
            Add PG
          </Link>
          <a href="#" className="hover:underline">
            Inquiries
          </a>
          <a href="#" className="hover:underline">
            Profile
          </a>
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="ml-4 bg-white hover:bg-gray-100 text-red-600 px-4 py-1.5 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
