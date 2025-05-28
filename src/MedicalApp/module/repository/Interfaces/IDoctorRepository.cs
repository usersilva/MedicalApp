using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

public interface IDoctorRepository : IRepository<Doctor>
{
    Task<List<Doctor>> GetAllAsync();
    Task<List<Doctor>> SearchAsync(string query);
    Task<List<Doctor>> FilterAsync(string specialty);
}