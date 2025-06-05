import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { getMedicalRecord, getAppointments } from "../utils/api";
import MedicalRecord from "../components/MedicalRecord";
import AppointmentForm from "../components/AppointmentForm";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("medical-record");

  const {
    data: medicalRecord,
    loading: recordLoading,
    error: recordError,
  } = useApi(() =>
    user && user.role === "patient" && user.id
      ? getMedicalRecord(user.id)
      : Promise.resolve(null)
  );
  const {
    data: appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useApi(() =>
    user && user.role === "patient" && user.id
      ? getAppointments(user.id)
      : Promise.resolve(null)
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;
  if (recordLoading || appointmentsLoading)
    return <div className="container mx-auto p-4">Загрузка...</div>;
  if (recordError || appointmentsError)
    return (
      <div className="container mx-auto p-4 text-red-500">
        Ошибка: {recordError || appointmentsError}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Личный кабинет</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Выйти
          </button>
        </div>

        {user.role === "patient" ? (
          <div>
            <div className="tabs mb-6">
              <button
                className={`tab ${
                  activeTab === "medical-record" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("medical-record")}
              >
                Медицинская карта
              </button>
              <button
                className={`tab ${
                  activeTab === "appointments" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                Назначения
              </button>
            </div>
            {activeTab === "medical-record" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MedicalRecord record={medicalRecord} />
              </div>
            )}
            {activeTab === "appointments" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <AppointmentForm appointments={appointments} />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Панель администратора
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/admin/add-doctor")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить врача
              </button>
              <button
                onClick={() => navigate("/admin/add-speciality")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить специальность
              </button>
              <button
                onClick={() => navigate("/admin/add-service")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить услугу
              </button>
              <button
                onClick={() => navigate("/admin/add-schedule")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить расписание
              </button>
              <button
                onClick={() => navigate("/admin/generate-report")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Сгенерировать отчёт
              </button>
              <button
                onClick={() => navigate("/admin/update-medical-record")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Обновить медицинскую карту
              </button>
              <button
                onClick={() => navigate("/admin/doctors")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Посмотреть всех врачей
              </button>
              <button
                onClick={() => navigate("/admin/services")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Посмотреть все услуги
              </button>
              <button
                onClick={() => navigate("/admin/specialities")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Посмотреть все специальности
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
