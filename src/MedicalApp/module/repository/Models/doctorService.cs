namespace MedicalApp.module.repository.Models;

public class DoctorService
{
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;
    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;
}