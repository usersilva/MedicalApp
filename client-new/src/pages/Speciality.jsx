import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { filterDoctors, getSpecialities } from "../utils/api";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ModalMessage from "../components/ModalMessage";
import DoctorCard from "../components/DoctorCard";

const Speciality = () => {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fetchDoctors = useCallback(() => filterDoctors(name), [name]);
  const { data: doctors, loading, error } = useApi(fetchDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const fetchSpecialities = useCallback(() => getSpecialities(), []);
  const query = searchParams.get("query");
  const specialityName = query || (name ? decodeURIComponent(name) : "");
  const [showAuthMessage] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    showLoginButton: false,
  });
  const { data: specialities } = useApi(fetchSpecialities);

  const showModal = (message, showLoginButton = false) => {
    setModal({
      show: true,
      message,
      showLoginButton,
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      message: "",
      showLoginButton: false,
    });
  };

  if (!specialityName || specialityName.trim() === "") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12">
          <p className="text-red-500 dark:text-red-400 text-center py-6">
            Ошибка: Не указано имя специальности. Пожалуйста, выберите
            специальность.
          </p>
          <button
            onClick={() => navigate("/specialities")}
            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
          >
            К списку специальностей
          </button>
        </div>
      </div>
    );
  }

  const filteredDoctors = doctors?.filter((doctor) => {
    const fullName = `${doctor.name} ${doctor.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    return !query || fullName.includes(query);
  });

  const handleBookAppointment = (doctor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSelectedDoctor(doctor);
      //setShowAuthMessage(true);
      showModal("Для записи на прием необходимо авторизоваться", true);
    } else {
      //setShowAuthMessage(false);
      setSelectedDoctor(doctor);
      setShowAppointmentForm(true);
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
              <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Специальность: {name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                На этой странице представлены все врачи нашей клиники с
                специальностью "{name}". Вы можете записаться на прием к любому
                из них.
              </p>

              <div className="flex items-center mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-300 dark:focus-within:ring-blue-500">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Поиск врача по имени..."
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-6">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <p className="text-red-500 dark:text-red-400 text-center">
                  Ошибка:{" "}
                  {error.message || "Не удалось загрузить данные врачей."}
                </p>
              </div>
            ) : filteredDoctors && filteredDoctors.length > 0 ? (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1">
                        <DoctorCard
                          name={`${doctor.name} ${doctor.lastName}`}
                          specialty={
                            doctor.specialityId
                              ? specialities?.find(
                                  (s) => s.id === doctor.specialityId
                                )?.name || "Специальность не указана"
                              : "Специальность не указана"
                          }
                          schedule={doctor.schedules?.map((s) => s.time) || []}
                        />
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doctor.schedules
                            ?.slice(0, 3)
                            .map((schedule, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs py-1 px-2 rounded-full"
                              >
                                {schedule.time}
                              </span>
                            ))}
                          {doctor.schedules?.length > 3 && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs py-1 px-2">
                              +{doctor.schedules.length - 3} ещё
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/doctor/${doctor.id}`)}
                            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
                          >
                            Подробнее
                          </button>
                          {showAuthMessage &&
                          selectedDoctor?.id === doctor.id ? (
                            <div className="flex flex-col items-start">
                              <p className="text-red-500 dark:text-red-400 text-sm mb-2">
                                Для записи на прием необходимо авторизоваться.
                              </p>
                              <Link
                                to="/login"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
                              >
                                Войти
                              </Link>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleBookAppointment(doctor)}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200"
                            >
                              Записаться
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Врачи по специальности "{name}" не найдены.
                </p>
                <button
                  onClick={() => navigate("/doctors")}
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
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                О специальности
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Специальность "{name}" включает врачей, специализирующихся на
                диагностике и лечении соответствующих заболеваний.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {filteredDoctors?.length || 0}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">врачей</div>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    4.7+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    средний рейтинг
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/doctors")}
                  className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <span>Все врачи</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <span>Медицинские услуги</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {showAppointmentForm && selectedDoctor && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  Запись к {selectedDoctor.name} {selectedDoctor.lastName}
                </h3>
                <div className="space-y-3">
                  <select className="w-full p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500">
                    {selectedDoctor.schedules?.map((schedule, index) => (
                      <option key={index} value={schedule.time}>
                        {schedule.time}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      alert("Запись успешно оформлена!");
                      setShowAppointmentForm(false);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
                  >
                    Подтвердить запись
                  </button>
                  <button
                    onClick={() => setShowAppointmentForm(false)}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md text-sm"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speciality;
