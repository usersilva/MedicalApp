const DoctorCard = ({ name, specialty, schedule = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex items-center transition-all duration-300 hover:shadow-md">
      <img src="/doctor.png" alt="Doctor" className="w-14 h-14 rounded-full mr-3 object-cover" />
      <div className="flex-1">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{specialty}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {schedule.length > 0 ? (
            schedule.slice(0, 3).map((time, index) => (
              <button key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs py-0.5 px-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300">
                {time}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">Нет доступного расписания</p>
          )}
          {schedule.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">+{schedule.length - 3} ещё</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;