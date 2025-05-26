namespace MedicalApp.module.api.dtos;

internal record ReviewDto
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