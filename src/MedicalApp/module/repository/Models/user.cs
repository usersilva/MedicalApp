namespace MedicalApp.module.repository.Models;

public class User
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public string PasswordHash = null!;
    public string? Role;

    public MedicalRecord? MedicalRecord { get; set; }
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}