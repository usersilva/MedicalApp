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
        return await _context.Set<Service>().ToListAsync();
    }

    public async Task<Service> AddAsync(Service service)
    {
        await _context.Set<Service>().AddAsync(service);
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task<bool> ExistsByNameAsync(string name)
    {
        return await _context.Set<Service>()
            .AnyAsync(s => s.Name.ToLower() == name.ToLower());
    }

    public async Task<List<Service>> FindByNameAsync(string name)
    {
        return await _context.Set<Service>()
            .Where(s => s.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
    }

}