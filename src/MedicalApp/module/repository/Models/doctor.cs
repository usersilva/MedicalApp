namespace MedicalApp.module.repository.Models;

public class Doctor
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int SpecialityId { get; set; }
    public Speciality Speciality { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsAvailable { get; set; } = true;
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    public ICollection<DoctorService> DoctorServices { get; set; } = new List<DoctorService>();
    public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}