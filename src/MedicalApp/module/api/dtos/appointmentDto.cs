using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record AppointmentDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("userId")]
    public int UserId { get; set; }

    [JsonPropertyName("doctorId")]
    public int DoctorId { get; set; }

    [JsonPropertyName("dateTime")]
    public DateTime DateTime { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; } = null!;

    [JsonPropertyName("user")]
    public UserDto? User { get; set; }

    [JsonPropertyName("doctor")]
    public DoctorDto? Doctor { get; set; }
    public MedicalRecordDto MedicalRecord { get; set; }
}