import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getDoctorById, getSpecialities } from '../utils/api';
import { useEffect, useState, useCallback } from 'react';

const Doctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchDoctor = useCallback(() => getDoctorById(id), [id]);
  const fetchSpecialities = useCallback(() => getSpecialities(), []);
  
  const { data: doctor, loading: doctorLoading, error: doctorError } = useApi(fetchDoctor);
  const { data: specialitiesResponse, loading: specialitiesLoading, error: specialitiesError } = useApi(fetchSpecialities);
  const [specialty, setSpecialty] = useState('Специальность не указана');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (doctor && specialitiesResponse?.data && doctor.specialityId) {
      const foundSpecialty = specialitiesResponse.data.find(s => s.id === doctor.specialityId);
      setSpecialty(foundSpecialty?.name || 'Специальность не указана');
    }
  }, [doctor, specialitiesResponse]);

  const handleBookAppointment = () => {
    if (selectedTime) {
      alert(`Вы записаны на ${selectedTime} к врачу ${doctor.name} ${doctor.lastName}`);
      // Здесь можно добавить реальную логику записи
    } else {
      alert('Пожалуйста, выберите время приёма');
    }
  };

  const handleSubmitReview = () => {
    alert(`Спасибо за ваш отзыв: "${reviewText}"`);
    setReviewText('');
    setShowReviewForm(false);
    // Здесь можно добавить отправку отзыва на сервер
  };

  const isDoctorValid = doctor && typeof doctor === 'object' && doctor.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Основное содержимое */}
          <div className="lg:w-2/3">
            {doctorLoading || specialitiesLoading ? (
              <div className="flex justify-center py-6">
                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : doctorError || specialitiesError ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <p className="text-red-500 dark:text-red-400 text-center">
                  Ошибка: {doctorError?.message || specialitiesError?.message || 'Не удалось загрузить данные врача.'}
                </p>
              </div>
            ) : isDoctorValid ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src="/doctor.png"
                      alt="Doctor"
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {doctor.name} {doctor.lastName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{specialty}</p>
                    
                    <div className="mt-3">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                        Доступное время
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.schedules && doctor.schedules.length > 0 ? (
                          doctor.schedules.map((schedule, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTime(schedule.time)}
                              className={`text-xs py-1 px-2 rounded-full transition duration-300 ${
                                selectedTime === schedule.time
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                              }`}
                            >
                              {schedule.time}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Расписание отсутствует.
                          </p>
                        )}
                      </div>
                      
                      {selectedTime && (
                        <button
                          onClick={handleBookAppointment}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
                        >
                          Записаться на {selectedTime}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Блок с отзывами */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                      Отзывы
                    </h3>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showReviewForm ? 'Скрыть форму' : 'Оставить отзыв'}
                    </button>
                  </div>
                  
                  {showReviewForm && (
                    <div className="mb-4">
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Ваш отзыв о враче..."
                        className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                        rows="3"
                      />
                      <button
                        onClick={handleSubmitReview}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Отправить отзыв
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">Анна К.</span>
                        <div className="flex text-yellow-400 text-xs">
                          ★★★★★
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Отличный специалист, всё объяснил доступным языком.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Врач не найден.
                </p>
                <button
                  onClick={() => navigate('/doctors')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
                >
                  Вернуться к списку врачей
                </button>
              </div>
            )}
          </div>
          
          {/* Боковая панель */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Контактная информация</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +375 (29) XXX-XX-XX
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {doctor?.email || 'email@example.com'}
                </div>
                <div className="flex items-start text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  г. Полоцк, ул. Пушкина, д. 1, каб. 305
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Быстрые действия</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/doctors')}
                  className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <span>Все врачи</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button 
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <span>Распечатать информацию</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Статистика</h3>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-gray-600 dark:text-gray-400">лет опыта</div>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">4.9</div>
                  <div className="text-gray-600 dark:text-gray-400">рейтинг</div>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">1,200+</div>
                  <div className="text-gray-600 dark:text-gray-400">пациентов</div>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">98%</div>
                  <div className="text-gray-600 dark:text-gray-400">довольных</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;