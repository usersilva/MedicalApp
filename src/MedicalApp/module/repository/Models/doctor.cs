namespace MedicalApp.module.repository.Models;

public class Doctor
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public bool IsAvailable = true;
    public Speciality Specialty { get; set; } = null!;
    public int SpecialityId { get; set; }

    public ICollection<Appointment>? Appointments;
    public ICollection<DoctorService>? DoctorServices;
}