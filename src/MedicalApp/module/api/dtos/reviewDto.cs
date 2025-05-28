namespace MedicalApp.module.api.dtos;

public record ReviewDto
{
    public int Id;
    public int PatientId;
    public int DoctorId;
    public string Comment = null!;
    public int Rating;
    public DateTime CreatedAt;

    public UserDto? Patient;
    public DoctorDto? Doctor;
}