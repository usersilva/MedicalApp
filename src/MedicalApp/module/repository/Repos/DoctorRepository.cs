using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class DoctorRepository : RepositoryBase<Doctor>, IDoctorRepository
{
    private readonly DbSet<Doctor> _dbSet;

    public DoctorRepository(MedicalAppContext context) : base(context)
    {
        _dbSet = context.Set<Doctor>();
    }

    public async Task<List<Doctor>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<List<Doctor>> SearchAsync(string query)
    {
        return await _dbSet
            .Where(d => d.LastName.Contains(query) || d.LastName.Contains(query) || (d.Specialty != null && d.Specialty.Name.Contains(query)))
            .ToListAsync();
    }

    public async Task<List<Doctor>> FilterAsync(string specialty)
    {
        return await _dbSet
            .Where(d => d.Specialty != null && d.Specialty.Name == specialty)
            .ToListAsync();
    }

    public async Task<Doctor?> GetByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }
}