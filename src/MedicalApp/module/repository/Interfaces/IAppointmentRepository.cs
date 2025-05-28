using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

public interface IAppointmentRepository : IRepository<Appointment>
{
    Task<List<Appointment>> GetByUserIdAsync(int userId);
    Task<List<Appointment>> GetByDoctorIdAsync(int doctorId);
    Task UpdateStatusAsync(int appointmentId, string status);
}