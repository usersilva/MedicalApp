using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
internal interface IServiceRepository : IRepository<Service>
{
    Task<List<Service>> GetAllAsync();
}