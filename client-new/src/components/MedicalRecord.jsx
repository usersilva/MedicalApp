 const MedicalRecord = ({ record }) => {
    if (!record) return null;
    
    return (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">Хронические заболевания</h3>
          <p className="text-gray-700 dark:text-gray-300">{record.chronicDiseases || "Нет данных"}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">Текущее состояние</h3>
          <p className="text-gray-700 dark:text-gray-300">{record.currentCondition || "Нет данных"}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">Рекомендации</h3>
          <p className="text-gray-700 dark:text-gray-300">{record.recommendations || "Нет рекомендаций"}</p>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Последнее обновление: {new Date(record.lastUpdated).toLocaleString()}
        </div>
      </div>
    );
  };

export default MedicalRecord;