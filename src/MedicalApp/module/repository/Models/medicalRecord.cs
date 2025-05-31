namespace MedicalApp.module.repository.Models;

public class MedicalRecord
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ChronicDiseases { get; set; }
    public string? CurrentCondition { get; set; }
    public string? Recommendations { get; set; }
    public DateTime? LastUpdated { get; set; }
}