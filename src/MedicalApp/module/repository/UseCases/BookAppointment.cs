using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class BookAppointment
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IScheduleRepository _scheduleRepository;

    public BookAppointment(IAppointmentRepository appointmentRepository, IScheduleRepository scheduleRepository)
    {
        _appointmentRepository = appointmentRepository;
        _scheduleRepository = scheduleRepository;
    }

    public async Task ExecuteAsync(int patientId, int doctorId, int scheduleId)
    {
        var schedule = (await _scheduleRepository.GetAvailableSlotsAsync(doctorId))
            .FirstOrDefault(s => s.Id == scheduleId && s.IsAvailable);

        if (schedule == null)
        {
            throw new InvalidOperationException("Selected time slot is not available.");
        }

        var appointment = new Appointment
        {
            UserId = patientId,
            DoctorId = doctorId,
            DateTime = schedule.StartTime,
            Status = "Pending"
        };

        schedule.IsAvailable = false;
        await _appointmentRepository.AddAsync(appointment);
        await _scheduleRepository.UpdateAsync(schedule);
        await _appointmentRepository.SaveChangesAsync();
    }
}