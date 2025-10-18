import { useSearchParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useFetch } from '../hooks/useFetch';
import { PropertyCard } from './PropertyCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');

  const url = `${import.meta.env.VITE_SERVER_ORIGIN}/api/property/search?city=${city}`;
  const { data, error } = useFetch(url);

  const listings = data?.data ?? [];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8">
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {listings.length} PGs Available in {city}
          </h2>

          {listings.map((pg) => (
            <div key={pg._id}>
              <PropertyCard pg={pg}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
