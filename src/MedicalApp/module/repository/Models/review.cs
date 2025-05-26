namespace MedicalApp.module.repository.Models;

internal class Review
{
    public int Id;
    public int PatientId;
    public int DoctorId;
    public string Comment = null!;
    public int Rating;
    public DateTime CreatedAt;

    public User? Patient;
    public Doctor? Doctor;
}