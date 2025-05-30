using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record DoctorDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = null!;

    [JsonPropertyName("specialty")]
    public SpecialityDto speciality { get; set; } = null!;

    [JsonPropertyName("specialityId")]
    public int specialityId { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("isAvailable")]
    public bool IsAvailable { get; set; } = true;

    [JsonPropertyName("appointments")]
    public ICollection<AppointmentDto>? Appointments { get; set; }

    [JsonPropertyName("doctorServices")]
    public ICollection<DoctorServiceDto>? DoctorServices { get; set; }

}