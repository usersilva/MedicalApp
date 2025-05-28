using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
public interface IScheduleRepository : IRepository<Schedule>
{
    Task<List<Schedule>> GetAvailableSlotsAsync(int doctorId);
    Task AddAsync(Schedule schedule);
}