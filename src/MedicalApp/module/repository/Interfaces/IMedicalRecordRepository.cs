using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

public interface IMedicalRecordRepository : IRepository<MedicalRecord>
{
    Task<MedicalRecord?> GetByUserIdAsync(int userId);
    Task<int> GetAppointmentCountAsync(int userId);
}