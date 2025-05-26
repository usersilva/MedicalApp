using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

internal interface IDoctorRepository : IRepository<Doctor>
{
    Task<List<Doctor>> GetAllAsync();
    Task<List<Doctor>> SearchAsync(string query);
    Task<List<Doctor>> FilterAsync(string specialty);
}