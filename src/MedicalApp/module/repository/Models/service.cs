namespace MedicalApp.module.repository.Models;

internal class Service
{
    public int Id;
    public string Name = null!;
    public decimal Price;

    public ICollection<DoctorService>? DoctorServices;
}