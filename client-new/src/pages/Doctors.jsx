import { Link, useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { useApi } from '../hooks/useApi';
import { getDoctors, getSpecialities, searchDoctors, filterDoctors } from '../utils/api';
import { useEffect, useState } from 'react';

const Doctors = () => {
  const navigate = useNavigate();
  const fetchDoctors = () => getDoctors();
  const fetchSpecialities = () => getSpecialities();
  const { data: doctors, loading: doctorsLoading, error: doctorsError } = useApi(fetchDoctors);
  const { data: specialities, loading: specialitiesLoading, error: specialitiesError } = useApi(fetchSpecialities);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(doctorsLoading || specialitiesLoading);
  }, [doctorsLoading, specialitiesLoading]);

  const handleSearch = async () => {
    if (searchQuery.trim() || selectedSpecialty) {
      try {
        let searchResults = [];
        let filterResults = [];

        if (searchQuery.trim()) {
          const searchResponse = await searchDoctors(searchQuery);
          searchResults = searchResponse?.data || [];
        }

        if (selectedSpecialty) {
          const filterResponse = await filterDoctors(selectedSpecialty);
          filterResults = filterResponse?.data || [];
        }

        if (searchQuery.trim() && selectedSpecialty) {
          const combinedResults = searchResults.filter((searchDoctor) =>
            filterResults.some((filterDoctor) => filterDoctor.id === searchDoctor.id)
          );
          setFilteredDoctors(combinedResults);
        } else {
          setFilteredDoctors(searchQuery.trim() ? searchResults : filterResults);
        }
      } catch (error) {
        console.error('Search/Filter error:', error);
        setFilteredDoctors([]);
      }
    } else {
      setFilteredDoctors(doctors || []);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setFilteredDoctors(doctors || []);
  };

  useEffect(() => {
    setFilteredDoctors(doctors || []);
  }, [doctors]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 pt-16 pt-28">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Все врачи
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-6">
          <div className="space-y-4">
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-300 dark:focus-within:ring-blue-500">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Имя врача, специальность, город..."
                className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Найти
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Все специальности</option>
                {specialities?.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Применить
              </button>
            </div>
            {(searchQuery.trim() || selectedSpecialty) && (
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : doctorsError || specialitiesError ? (
          <p className="text-red-500 dark:text-red-400 text-center py-6">
            Ошибка: {doctorsError?.message || specialitiesError?.message || 'Не удалось загрузить данные.'}
          </p>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
              >
                <div onClick={() => navigate(`/doctor/${doctor.id}`)} className="cursor-pointer flex-grow">
                  <DoctorCard
                    name={`${doctor.name} ${doctor.lastName}`}
                    specialty={
                                    doctor.specialityId
                                      ? specialities?.find(
                                          (s) => s.id === doctor.specialityId
                                        )?.name || "Специальность не указана"
                                      : "Специальность не указана"
                                  }
                    schedule={doctor.schedules?.map(s => s.time) || []}
                  />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/doctor/${doctor.id}`); }}
                  className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  Подробнее
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-6">Врачи не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;