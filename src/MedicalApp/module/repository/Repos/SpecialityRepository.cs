using Microsoft.EntityFrameworkCore;
using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;

namespace MedicalApp.module.repository.Repos;

internal class SpecialityRepository : RepositoryBase<Speciality>, ISpecialityRepository
{
    public SpecialityRepository(MedicalAppContext context) : base(context) { }

    public async Task<Speciality> GetByNameAsync(string name)
    {
        return await _context.Set<Speciality>()
            .FirstOrDefaultAsync(s => s.Name == name);
    }
    public async Task<List<Speciality>> FindAllAsync()
    {
        return await _context.Set<Speciality>()
            .ToListAsync();
    }
}