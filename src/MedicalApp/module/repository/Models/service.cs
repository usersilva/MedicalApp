namespace MedicalApp.module.repository.Models;

public class Service
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public ICollection<DoctorService> DoctorServices { get; set; } = new List<DoctorService>();
}