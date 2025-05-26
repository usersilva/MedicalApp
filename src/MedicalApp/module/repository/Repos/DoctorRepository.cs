using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class DoctorRepository : RepositoryBase<Doctor>, IDoctorRepository
{
    public DoctorRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<List<Doctor>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<List<Doctor>> SearchAsync(string query)
    {
        return await _dbSet
            .Where(d => d.Name.Contains(query) || d.LastName.Contains(query) || d.Specialty.Contains(query))
            .ToListAsync();
    }

    public async Task<List<Doctor>> FilterAsync(string specialty)
    {
        return await _dbSet
            .Where(d => d.Specialty == specialty)
            .ToListAsync();
    }
}