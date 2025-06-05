import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MedicalRecord from '../components/MedicalRecord';
import AppointmentForm from '../components/AppointmentForm';
import { useApi } from '../hooks/useApi';
import { getMedicalRecord, getAppointments, bookAppointment } from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('medical-record');
  const [expandedTips, setExpandedTips] = useState([false, false, false]);
  const { data: medicalRecord } = useApi(() => user?.id ? getMedicalRecord(user.id) : Promise.resolve(null));
  const { data: appointments } = useApi(() => user?.id ? getAppointments(user.id) : Promise.resolve(null));

  
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
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">23 300</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">пациентов записались</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">64 151</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">отзывов на сайте</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">148</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">врачей в нашей базе</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ответы на частые вопросы",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center space-y-2">
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg max-w-[70%] text-sm">
              <p>Цены такие же, как в клинике?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[70%] text-sm">
              <p>Нет, часто дешевле — у нас есть скидки до 30%!</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg max-w-[70%] text-sm">
              <p>За сервис нужно платить?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[70%] text-sm">
              <p>Нет, сервис бесплатный. Платите только за приём.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Как записаться на приём?",
      content: (
        <div className="min-h-[150px] flex flex-col justify-center space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Выберите дату и время в личном кабинете
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Мы уведомим вас о записи, и операторы помогут с вопросами
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Вы получите подтверждение на почту и напоминание за день до приёма
            </p>
          </div>
        </div>
      ),
    },
  ];

  const tips = [
    {
      title: "Регулярные проверки",
      short: "Регулярно проверяйте здоровье: профилактика лучше лечения!",
      full: "Регулярные проверки здоровья помогают выявить проблемы на ранней стадии, что значительно упрощает лечение. Рекомендуем проходить общий осмотр раз в год, сдавать анализы и консультироваться с терапевтом, чтобы поддерживать своё здоровье на высоком уровне.",
    },
    {
      title: "Выбор врача",
      short: "Выбирайте врача по отзывам и рейтингу для лучшего опыта.",
      full: "Отзывы и рейтинги помогают понять, насколько врач подходит именно вам. Обращайте внимание на опыт специалиста, его подход к пациентам и доступность записи. На нашем сайте вы можете фильтровать врачей по этим параметрам, чтобы найти лучшего!",
    },
    {
      title: "Подтверждение записи",
      short: "Не забудьте подтвердить запись после получения email.",
      full: "После записи на приём вы получите письмо с подтверждением. Убедитесь, что вы подтвердили запись, чтобы ваш слот был зарезервирован. Если у вас возникнут вопросы, наши операторы всегда готовы помочь вам по телефону или через чат.",
    },
  ];

  const recommendedServices = [
    { 
      title: "Терапевт", 
      description: "Консультация для общего осмотра и рекомендаций.", 
      rating: 4.8,
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      title: "Кардиолог", 
      description: "Проверка сердца и сосудов для вашего здоровья.", 
      rating: 4.9,
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      title: "УЗИ", 
      description: "Диагностика внутренних органов с высокой точностью.", 
      rating: 4.7,
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleBookAppointment = async () => {
    const appointmentData = {
      patientId: user.id,
      doctorId: 1,
      scheduleId: 2,
    };
    try {
      await bookAppointment(appointmentData);
      alert('Запись на приём успешно создана!');
    } catch (error) {
      alert('Ошибка при записи на приём: ' + error.message);
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
            {/* Личный кабинет */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                      alt="User Avatar"
                      className="w-14 h-14 rounded-full border-4 border-blue-100 dark:border-blue-900 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Личный кабинет
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Добро пожаловать, {user?.name || 'Пользователь'}!
                    </p>
                  </div>
                </div>

                {/* Табы */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button
                    onClick={() => setActiveTab('medical-record')}
                    className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'medical-record' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    Медицинская карта
                    {activeTab === 'medical-record' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'appointments' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    История посещений
                    {activeTab === 'appointments' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t"></span>
                    )}
                  </button>
                </div>

                {/* Контент табов */}
                <div className="mb-6">
                  {activeTab === 'medical-record' && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      {medicalRecord ? (
                        <MedicalRecord record={medicalRecord} />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Медицинская карта загружается...</p>
                      )}
                    </div>
                  )}
                  {activeTab === 'appointments' && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      {appointments ? (
                        <AppointmentForm appointments={appointments} />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Данные о назначениях загружаются...</p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Записаться на приём</span>
                </button>
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

            {/* Рекомендуемые услуги */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Рекомендуемые услуги</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedServices.map((service, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate('/services')}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {service.icon}
                          <h3 className="font-semibold text-gray-800 dark:text-white">{service.title}</h3>
                        </div>
                        <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
                    </div>
                  ))}
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

            {/* Прогресс здоровья */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Прогресс здоровья</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Выполнено рекомендаций</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Активных</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Завершено</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xl font-bold text-gray-600 dark:text-gray-400">2</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Ожидают</div>
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
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Найти врача</span>
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => navigate('/appointments')}
                  >
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Мои записи</span>
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => navigate('/medical-records')}
                  >
                    <span className="text-gray-800 dark:text-white text-sm font-medium">Медкарта</span>
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
    </div>
  );
};

export default Profile;