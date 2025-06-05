import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { addDoctor, addSpeciality, addSchedule, addService, generateReport } from '../utils/api';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedTips, setExpandedTips] = useState([false, false, false]);
  const { data: report } = useApi(() => user?.id ? generateReport() : Promise.resolve(null));

  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    specialityId: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "13 лет оптимизации медицинских процессов",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Система управления начата в 2012 году. Мы автоматизируем работу администраторов и улучшаем доступ к данным!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">148</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">врачей в базе</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">64 151</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">отзывов обработано</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">23 300</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">пациентов в системе</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Управление данными",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center space-y-2">
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg max-w-[70%] text-sm">
              <p>Как добавить врача?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[70%] text-sm">
              <p>Используйте кнопку «Добавить врача» в панели!</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg max-w-[70%] text-sm">
              <p>Где найти отчёты?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[70%] text-sm">
              <p>Нажмите «Сформировать отчёт» в панели.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Процесс управления",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Добавьте специализацию или врача
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Настройте расписание
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Сгенерируйте отчёт для анализа
            </p>
          </div>
        </div>
      ),
    },
  ];

  const tips = [
    {
      title: "Добавление врачей",
      short: "Добавляйте врачей с актуальными данными!",
      full: "Убедитесь, что вы вводите корректные имя, фамилию, email и специализацию при добавлении врача. Это важно для точного управления расписанием и записями.",
    },
    {
      title: "Управление расписанием",
      short: "Проверяйте расписание перед добавлением.",
      full: "Перед добавлением нового расписания убедитесь, что слоты не пересекаются с существующими. Это предотвратит конфликты при записи пациентов.",
    },
    {
      title: "Генерация отчётов",
      short: "Регулярно формируйте отчёты.",
      full: "Регулярная генерация отчётов помогает анализировать нагрузку врачей и улучшать управление медицинскими услугами.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
    setDoctorData({ name: '', email: '', specialityId: '' }); // Сбрасываем данные формы
    setErrorMessage(''); // Сбрасываем сообщение об ошибке
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  // Валидация и сохранение данных врача
  const handleAddDoctor = async () => {
    // Простая валидация
    if (!doctorData.name.trim()) {
      setErrorMessage('Пожалуйста, укажите имя врача.');
      return;
    }
    if (!doctorData.email.trim()) {
      setErrorMessage('Пожалуйста, укажите email врача.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctorData.email)) {
      setErrorMessage('Пожалуйста, укажите корректный email.');
      return;
    }
    if (!doctorData.specialityId || isNaN(doctorData.specialityId) || doctorData.specialityId <= 0) {
      setErrorMessage('Пожалуйста, укажите корректный ID специализации (положительное число).');
      return;
    }

    try {
      await addDoctor(doctorData);
      alert('Врач успешно добавлен!');
      closeModal();
    } catch (error) {
      setErrorMessage('Ошибка при добавлении врача: ' + error.message);
    }
  };

  const handleAddSpeciality = async () => {
    const specialityData = { name: "Терапия" };
    try {
      await addSpeciality(specialityData);
      alert('Специализация успешно добавлена!');
    } catch (error) {
      alert('Ошибка при добавлении специализации: ' + error.message);
    }
  };

  const handleAddSchedule = async () => {
    const scheduleData = { doctorId: 1, startTime: "2025-06-02T10:00:00Z", endTime: "2025-06-02T12:00:00Z" };
    try {
      await addSchedule(scheduleData);
      alert('Расписание успешно добавлено!');
    } catch (error) {
      alert('Ошибка при добавлении расписания: ' + error.message);
    }
  };

  const handleAddService = async () => {
    const serviceData = { name: "Консультация", description: "Общий осмотр", price: 50 };
    try {
      await addService(serviceData);
      alert('Услуга успешно добавлена!');
    } catch (error) {
      alert('Ошибка при добавлении услуги: ' + error.message);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const reportData = await generateReport();
      alert('Отчёт успешно сгенерирован!');
      console.log(reportData);
    } catch (error) {
      alert('Ошибка при генерации отчёта: ' + error.message);
    }
  };

  const toggleTip = (index) => {
    setExpandedTips((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Основной контент */}
          <div className="lg:col-span-3 space-y-6">
            {/* Панель администратора */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                      alt="Admin Avatar"
                      className="w-14 h-14 rounded-full border-4 border-blue-100 dark:border-blue-900 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Панель администратора
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Добро пожаловать, {user?.name || 'Администратор'}!
                    </p>
                  </div>
                </div>

                {/* Табы */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    Панель управления
                    {activeTab === 'dashboard' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'report' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    Отчёты
                    {activeTab === 'report' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t"></span>
                    )}
                  </button>
                </div>

                {/* Контент табов */}
                <div className="mb-6">
                  {activeTab === 'dashboard' && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={openModal} // Открываем модальное окно вместо прямого вызова handleAddDoctor
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Добавить врача
                        </button>
                        <button
                          onClick={handleAddSpeciality}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Добавить специализацию
                        </button>
                        <button
                          onClick={handleAddSchedule}
                          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Добавить расписание
                        </button>
                        <button
                          onClick={handleAddService}
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Добавить услугу
                        </button>
                      </div>
                    </div>
                  )}
                  {activeTab === 'report' && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      {report ? (
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Отчёт</h3>
                          <pre className="text-gray-600 dark:text-gray-400 text-sm mt-2">{JSON.stringify(report, null, 2)}</pre>
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Отчёт загружается...</p>
                      )}
                      <button
                        onClick={handleGenerateReport}
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Сформировать отчёт
                      </button>
                    </div>
                  )}
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
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Полезные советы */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Полезные советы</h3>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${expandedTips[index] ? 'bg-blue-50 dark:bg-gray-700 border border-blue-100 dark:border-gray-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      onClick={() => toggleTip(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${expandedTips[index] ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">{tip.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{tip.short}</p>
                          {expandedTips[index] && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{tip.full}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Прогресс управления */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Прогресс управления</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Обновлено данных</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" 
                    style={{ width: '80%' }}
                  ></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Врачей</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">3</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Специализаций</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xl font-bold text-gray-600 dark:text-gray-400">2</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Расписания</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => navigate('/doctors')}
                  >
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Список врачей</span>
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => navigate('/specialities')}
                  >
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Список специализаций</span>
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => navigate('/services')}
                  >
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Список услуг</span>
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для добавления врача */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Добавить врача</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Имя врача
                </label>
                <input
                  type="text"
                  name="name"
                  value={doctorData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Введите имя врача"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={doctorData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Введите email врача"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ID специализации
                </label>
                <input
                  type="number"
                  name="specialityId"
                  value={doctorData.specialityId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Введите ID специализации"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 dark:text-red-400 text-sm">{errorMessage}</p>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddDoctor}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;