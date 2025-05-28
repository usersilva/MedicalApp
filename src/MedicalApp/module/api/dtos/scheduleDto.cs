namespace MedicalApp.module.api.dtos;

public record ScheduleDto
{
    public int Id;
    public int DoctorId;
    public DateTime StartTime;
    public DateTime EndTime;
    public bool IsAvailable;

    public DoctorDto? Doctor;
}