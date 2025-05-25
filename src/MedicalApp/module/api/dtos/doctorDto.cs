namespace MedicalApp.module.api.dtos;

internal record DoctorDto
{
    public int Id;
    public string Name = null!;
    public string LastName = null!;
    public string Specialty = null!;
    public string Email = null!;
    public bool IsAvailable = true;

    public ICollection<AppointmentDto>? Appointments;
    public ICollection<DoctorServiceDto>? DoctorServices;
}