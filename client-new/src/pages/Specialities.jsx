import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getSpecialities } from '../utils/api';
import { useEffect, useState } from 'react';

const Specialities = () => {
  const fetchSpecialities = () => getSpecialities();
  const { data: specialities, loading, error } = useApi(fetchSpecialities);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpecialities, setFilteredSpecialities] = useState([]);

  useEffect(() => {
    if (specialities) {
      setFilteredSpecialities(
        specialities.filter((spec) =>
          spec.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
      );
    }
  }, [searchQuery, specialities]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 pt-28">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Все специальности
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-300 dark:focus-within:ring-blue-500">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Поиск специальности..."
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 text-center">Ошибка: {error.message}</p>
        ) : filteredSpecialities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSpecialities.map((spec) => (
              <Link
                key={spec.id}
                to={`/speciality/${spec.name}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{spec.name}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">Специальности не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default Specialities;