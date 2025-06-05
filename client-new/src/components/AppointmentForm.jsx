const AppointmentForm = ({ appointments }) => {
    if (!appointments || appointments.length === 0) {
      return <p className="text-gray-600 dark:text-gray-400">У вас нет предстоящих назначений</p>;
    }
    
    return (
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div key={appointment.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">Прием #{appointment.id}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Врач ID: {appointment.doctorId}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Дата и время: {new Date(appointment.dateTime).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                appointment.status === 'Pending' 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                  : appointment.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
              }`}>
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default AppointmentForm;