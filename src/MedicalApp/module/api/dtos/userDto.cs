namespace MedicalApp.module.api.dtos;

internal record UserDto
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Email = null!;
    public string PasswordHash = null!;

    public MedicalRecordDto? MedicalRecord;
    public ICollection<AppointmentDto>? Appointments;
}