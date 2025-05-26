using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class ServiceRepository : RepositoryBase<Service>, IServiceRepository
{
    public ServiceRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<List<Service>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }
}