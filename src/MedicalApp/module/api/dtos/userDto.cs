namespace MedicalApp.module.api.dtos;

public record UserDto
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public string PasswordHash = null!;
    public string? Role;
    public MedicalRecordDto? MedicalRecord;
    public ICollection<AppointmentDto>? Appointments;
}