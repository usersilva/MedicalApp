namespace MedicalApp.module.repository.Models;

public class User
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public string PasswordHash = null!;
    public string? Role;

    public MedicalRecord? MedicalRecord;
    public ICollection<Appointment>? Appointments;
}