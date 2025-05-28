using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
public interface IServiceRepository : IRepository<Service>
{
    Task<List<Service>> GetAllAsync();
}