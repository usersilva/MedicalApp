import { useApi } from '../hooks/useApi';
import { getServices, searchServices } from '../utils/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalMessage from '../components/ModalMessage'; // Импортируем ModalMessage

const Services = () => {
  const fetchServices = () => getServices();
  const { data: services, loading, error } = useApi(fetchServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    message: '',
    showLoginButton: false
  });

  const showModal = (message, showLoginButton = false) => {
    setModal({
      show: true,
      message,
      showLoginButton
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      message: '',
      showLoginButton: false
    });
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const result = await searchServices(searchQuery);
        setFilteredServices(result?.data || []);
        setSelectedService(null);
      } catch (error) {
        console.error('Service Search error:', error);
        setFilteredServices([]);
      }
    } else {
      setFilteredServices(services || []);
    }
  };

  useEffect(() => {
    setFilteredServices(services || []);
  }, [services]);

  const serviceDescriptions = {
    "Консультация терапевта": "Первичный осмотр и консультация врача-терапевта с назначением необходимых обследований и лечения.",
    "УЗИ брюшной полости": "Ультразвуковое исследование органов брюшной полости (печень, желчный пузырь, поджелудочная железа, селезенка).",
    "ЭКГ": "Электрокардиограмма - исследование электрической активности сердца для диагностики сердечно-сосудистых заболеваний.",
    "Анализ крови": "Комплексный анализ крови, включающий общий анализ, биохимию и другие показатели по назначению врача.",
    "Массаж спины": "Лечебный массаж спины для снятия напряжения, улучшения кровообращения и устранения болевых ощущений."
  };

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showModal('Для записи на услугу необходимо авторизоваться', true);
    } else {
      alert(`Запись на услугу "${selectedService.name}"`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {modal.show && (
        <ModalMessage
          message={modal.message}
          onClose={closeModal}
          showLoginButton={modal.showLoginButton}
        />
      )}
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Основное содержимое */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Медицинские услуги</h1>
              
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-300 dark:focus-within:ring-blue-500 mb-4">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Поиск услуги..."
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Найти
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-6">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : error ? (
                <p className="text-red-500 dark:text-red-400 text-center py-6">Ошибка: {error.message}</p>
              ) : filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border cursor-pointer transition-all duration-300 ${
                        selectedService?.id === service.id 
                          ? 'border-blue-500 dark:border-blue-500' 
                          : 'border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{service.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">От 50 руб.</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-6">Услуги не найдены.</p>
              )}
            </div>

            {/* Детали выбранной услуги */}
            {selectedService && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{selectedService.name}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Описание</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {serviceDescriptions[selectedService.name] || "Подробное описание данной услуги. Включает все необходимые процедуры и обследования."}
                    </p>
                    
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Показания</h3>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc pl-5 mb-4">
                      <li>Диагностика заболеваний</li>
                      <li>Профилактический осмотр</li>
                      <li>Наблюдение при хронических заболеваниях</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Информация</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Стоимость:</span>
                        <span className="ml-2 font-medium text-gray-800 dark:text-white">от 50 руб.</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Длительность:</span>
                        <span className="ml-2 font-medium text-gray-800 dark:text-white">30-60 мин</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Подготовка:</span>
                        <span className="ml-2 font-medium text-gray-800 dark:text-white">Не требуется</span>
                      </div>
                      <button
                        onClick={handleBookAppointment}
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Боковая панель */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Популярные услуги</h3>
              <div className="space-y-2">
                {services?.slice(0, 5).map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition"
                  >
                    {service.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Как записаться?</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</div>
                  <p>Выберите нужную услугу из списка</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</div>
                  <p>Нажмите кнопку "Записаться"</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</div>
                  <p>Выберите удобное время и подтвердите запись</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;