using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class AppointmentRepository : RepositoryBase<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<List<Appointment>> GetByUserIdAsync(int userId)
    {
        return await _dbSet
            .Where(a => a.UserId == userId)
            .ToListAsync();
    }

    public async Task<List<Appointment>> GetByDoctorIdAsync(int doctorId)
    {
        return await _dbSet
            .Where(a => a.DoctorId == doctorId)
            .ToListAsync();
    }

    public async Task UpdateStatusAsync(int appointmentId, string status)
    {
        var appointment = await _dbSet.FindAsync(appointmentId);
        if (appointment != null)
        {
            appointment.Status = status;
            await UpdateAsync(appointment);
        }
    }
}