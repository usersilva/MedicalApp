// src/components/DoctorCard.jsx

const DoctorCard = ({ name, specialty, schedule = [] }) => { // Добавлено = []
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center mb-4">
      <img src="/doctor.png" alt="Doctor" className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{specialty}</p>
        <div className="flex flex-wrap space-x-2 mt-2"> {/* flex-wrap добавлен для лучшего отображения */}
          {schedule.length > 0 ? (
            schedule.map((time, index) => (
              <button key={index} className="btn btn-outline btn-sm mt-1"> {/* mt-1 для небольшого отступа при переносе */}
                {time}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-1">Нет доступного расписания</p> // Сообщение, если расписание пустое
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;