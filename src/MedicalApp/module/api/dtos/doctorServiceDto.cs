namespace MedicalApp.module.api.dtos;

public record DoctorServiceDto
{
    public int DoctorId;
    public int ServiceId;

    public DoctorDto? Doctor;
    public ServiceDto? Service;
}