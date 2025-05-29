using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

public interface ISpecialityRepository : IRepository<Speciality>
{
    Task<Speciality> GetByNameAsync(string name);
    Task<List<Speciality>> FindAllAsync();
}