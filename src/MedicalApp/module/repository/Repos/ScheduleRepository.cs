using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class ScheduleRepository : RepositoryBase<Schedule>, IScheduleRepository
{
    public ScheduleRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<List<Schedule>> GetAvailableSlotsAsync(int doctorId)
    {
        return await _dbSet
            .Where(s => s.DoctorId == doctorId && s.IsAvailable)
            .ToListAsync();
    }

    public override async Task AddAsync(Schedule schedule)
    {
        await base.AddAsync(schedule);
    }
}