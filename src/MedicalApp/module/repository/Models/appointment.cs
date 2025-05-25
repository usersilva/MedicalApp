namespace MedicalApp.module.repository.Models;

internal class Appointment
{
    public int Id;
    public int UserId;
    public int DoctorId;
    public DateTime DateTime;
    public string Status = null!;

    public User? User;
    public Doctor? Doctor;
}