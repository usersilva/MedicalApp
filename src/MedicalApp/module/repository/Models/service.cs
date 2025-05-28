namespace MedicalApp.module.repository.Models;

public class Service
{
    public int Id;
    public string Name = null!;
    public decimal Price;

    public ICollection<DoctorService>? DoctorServices;
}