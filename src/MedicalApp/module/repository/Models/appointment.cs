namespace MedicalApp.module.repository.Models;

public class Appointment
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;
    public DateTime DateTime { get; set; }
    public string Status { get; set; } = null!;
}