namespace MedicalApp.module.repository.Models;

public class MedicalRecord
{
    public int Id;
    public int UserId;
    public DateTime CreationDate;
    public string Diagnosis = null!;
    public bool IsActive = false;

    public User? User;
}