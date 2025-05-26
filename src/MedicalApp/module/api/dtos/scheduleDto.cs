namespace MedicalApp.module.api.dtos;

internal record Schedule
{
    public int Id;
    public int DoctorId;
    public DateTime StartTime;
    public DateTime EndTime;
    public bool IsAvailable;

    public DoctorDto? Doctor;
}