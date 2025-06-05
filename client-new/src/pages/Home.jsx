import { Link, useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard'; // Assuming DoctorCard is well-defined
import { useApi } from '../hooks/useApi';
import { getDoctors, getSpecialities, getServices } from '../utils/api';
import { useCallback, useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const fetchDoctors = useCallback(() => getDoctors(), []);
  const fetchSpecialities = useCallback(() => getSpecialities(), []);
  const fetchServices = useCallback(() => getServices(), []);

  const { data: doctors, loading: doctorsLoading, error: doctorsError } = useApi(fetchDoctors);
  const { data: specialities, loading: specialitiesLoading, error: specialitiesError } = useApi(fetchSpecialities);
  const { data: services, loading: servicesLoading, error: servicesError } = useApi(fetchServices);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "13 лет заботимся о вашем здоровье",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Сервис начал свою работу в 2012 году. Мы помогли тысячам людей и продолжаем улучшать качество медицинских услуг! Наша миссия — сделать медицину доступной.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">23 300+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">пациентов записались</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">64 151+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">отзывов на сайте</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{doctors ? doctors.length : '100+'}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">врачей в нашей базе</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Как найти нужного врача?",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Используйте строку поиска, чтобы найти врача по имени, специальности, или городу.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Просмотрите список врачей и выберите подходящего специалиста.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Перейдите на страницу врача для просмотра детальной информации и записи на приём.
            </p>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!doctorsLoading && !specialitiesLoading && !servicesLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [doctorsLoading, specialitiesLoading, servicesLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = () => {
    // Client-side filtering is already handled by filteredDoctors
    // If you have a backend search endpoint, call it here.
    console.log('Initiating search for:', searchQuery);
  };

  const filteredDoctors = doctors?.filter(doctor => {
    const fullName = `${doctor.name} ${doctor.lastName}`.toLowerCase();
    const specialityName = doctor.speciality?.name.toLowerCase() || '';
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // Show all doctors if search query is empty
    return fullName.includes(query) || specialityName.includes(query);
  });
  
  const displayDoctors = searchQuery ? filteredDoctors : doctors;


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-24">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Загрузка...</p>
            </div>
          </div>
        ) : doctorsError || specialitiesError || servicesError ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 dark:text-red-400">
                Ошибка: {doctorsError?.message || specialitiesError?.message || servicesError?.message || 'Не удалось загрузить данные.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Основной контент */}
            <div className="lg:col-span-3 space-y-6">
              {/* Заголовок и поиск */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                    Запишитесь на приём к врачу онлайн
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
                    Найдите лучших специалистов в вашем городе и запишитесь без очередей.
                  </p>
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
                </div>
              </div>

              {/* Информационный слайдер */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <div className="relative">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      {slides[currentSlide].title}
                    </h2>
                    <div className="relative overflow-hidden min-h-[150px]">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {slides.map((slide, index) => (
                          <div key={index} className="min-w-full">
                            {slide.content}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2 mt-4">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Врачи */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {searchQuery.trim() ? `Результаты поиска (${displayDoctors?.length || 0})` : `Наши врачи (${doctors?.length || 0})`}
                    </h2>
                    {searchQuery.trim() && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Сбросить поиск
                        </button>
                    )}
                  </div>
                  { displayDoctors && displayDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayDoctors?.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col" // Added flex flex-col
                        >
                          <div onClick={() => navigate(`/doctor/${doctor.id}`)} className="cursor-pointer flex-grow"> {/* Added flex-grow */}
                            <DoctorCard
                              name={`${doctor.name} ${doctor.lastName}`}
                              specialty={doctor.speciality?.name || 'Специализация не указана'}
                              // Assuming DoctorCard can take schedule, if not, display it here
                              // schedule={doctor.schedules && doctor.schedules.length > 0 ? doctor.schedules.slice(0, 2).map(s => s.time).join(', ') : 'Нет данных'}
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
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {searchQuery.trim() ? 'По вашему запросу врачей не найдено. Попробуйте изменить критерии поиска.' : 'Информация о врачах в данный момент отсутствует.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              {/* Специальности */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Специальности</h3>
                  <div className="space-y-3">
                    {specialities?.slice(0, 5).map((spec) => (
                      <Link
                        key={spec.id}
                        to={`/speciality/${spec.id}`}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      >
                        <span className="text-gray-800 dark:text-white text-sm font-medium">{spec.name}</span>
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                    {specialities && specialities.length > 5 && (
                       <Link
                        to="/specialities" // TODO: Create a page for all specialities
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-3"
                       >
                        Посмотреть все специальности
                       </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Услуги */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Популярные услуги</h3>
                  <div className="space-y-3">
                    {services?.slice(0, 5).map((service) => (
                      <Link
                        key={service.id}
                        to={`/service/${service.id}`}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      >
                        <span className="text-gray-800 dark:text-white text-sm font-medium">{service.name}</span>
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                     {services && services.length > 5 && (
                       <Link
                        to="/services" // TODO: Create a page for all services
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-3"
                       >
                        Посмотреть все услуги
                       </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Полезные советы */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Полезные советы</h3>
                  <div className="space-y-4">
                    {[
                        {
                            title: "Выбор специалиста",
                            short: "Читайте отзывы и выбирайте врача, который вам подходит.",
                        },
                        {
                            title: "Подготовка к приёму",
                            short: "Заранее подготовьте вопросы к врачу и результаты анализов.",
                        },
                        {
                            title: "Экономьте время",
                            short: "Записывайтесь онлайн, чтобы избежать очередей в клинике.",
                        }
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white text-sm">{tip.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{tip.short}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;