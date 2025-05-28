namespace MedicalApp.module.api.dtos;

public record AppointmentDto
{
    public int Id;
    public int UserId;
    public int DoctorId;
    public DateTime DateTime;
    public string Status= null!;

    public UserDto? User;
    public DoctorDto? Doctor;
}