using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record ServiceDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("price")]
    public decimal Price { get; set; }

    [JsonPropertyName("doctorServices")]
    public ICollection<DoctorServiceDto>? DoctorServices { get; set; }
}