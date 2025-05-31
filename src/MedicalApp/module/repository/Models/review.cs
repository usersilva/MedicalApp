namespace MedicalApp.module.repository.Models;

public class Review
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public User Patient { get; set; } = null!;
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;
    public string? Comment { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
}