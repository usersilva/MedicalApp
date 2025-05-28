namespace MedicalApp.module.api.dtos;

public record MedicalRecordDto
{
    public int Id;
    public int UserId;
    public DateTime CreationDate;
    public string Diagnosis = null!;
    public bool IsActive = false;

    public UserDto? User;
}