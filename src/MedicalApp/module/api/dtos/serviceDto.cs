namespace MedicalApp.module.api.dtos;

internal record ServiceDto
{
    public int Id;
    public string Name = null!;
    public decimal Price;

    public ICollection<DoctorServiceDto>? DoctorServices;
}