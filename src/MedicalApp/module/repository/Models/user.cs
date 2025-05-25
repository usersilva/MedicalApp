namespace MedicalApp.module.repository.Models;

internal class User
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public string PasswordHash = null!;

    public MedicalRecord? MedicalRecord;
    public ICollection<Appointment>? Appointments;
}