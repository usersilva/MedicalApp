namespace MedicalApp.module.repository.Models;

public class Schedule
{
    public int Id;
    public int DoctorId;
    public DateTime StartTime;
    public DateTime EndTime;
    public bool IsAvailable;

    public Doctor? Doctor;
}