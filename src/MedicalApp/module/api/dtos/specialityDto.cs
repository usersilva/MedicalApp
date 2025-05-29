using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record SpecialityDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("doctors")]
    public List<DoctorDto> Doctors { get; set; } = new();
}