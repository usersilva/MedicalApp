using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

internal interface IMedicalRecordRepository : IRepository<MedicalRecord>
{
    Task<MedicalRecord?> GetByUserIdAsync(int userId);
}