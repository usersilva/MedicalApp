namespace MedicalApp.module.api.RequestModels;
public record LoginRequest(string Email, string Password);
public record BookAppointmentRequest(int PatientId, int DoctorId, int ScheduleId);