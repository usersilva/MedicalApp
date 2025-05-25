namespace MedicalApp.module.repository.Models;

internal class Doctor
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Specialty = null!;
    public string Email = null!;
    public bool IsAvailable = true;

    public ICollection<Appointment>? Appointments;
    public ICollection<DoctorService>? DoctorServices;
}