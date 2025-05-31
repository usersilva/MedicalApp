using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;

namespace MedicalApp.module.repository.Interfaces;

public interface IServiceRepository : IRepository<Service>
{
    Task<List<Service>> GetAllAsync();
    Task<Service> AddAsync(Service service);
    Task<bool> ExistsByNameAsync(string name);
    Task<List<Service>> FindByNameAsync(string name);
}