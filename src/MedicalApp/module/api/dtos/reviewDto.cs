using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record ReviewDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("patientId")]
    public int PatientId { get; set; }

    [JsonPropertyName("doctorId")]
    public int DoctorId { get; set; }

    [JsonPropertyName("comment")]
    public string Comment { get; set; } = null!;

    [JsonPropertyName("rating")]
    public int Rating { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("patient")]
    public UserDto? Patient { get; set; }

    [JsonPropertyName("doctor")]
    public DoctorDto? Doctor { get; set; }
}