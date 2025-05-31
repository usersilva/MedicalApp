using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record ScheduleDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("doctorId")]
    public int DoctorId { get; set; }

    [JsonPropertyName("startTime")]
    public DateTime StartTime { get; set; }

    [JsonPropertyName("endTime")]
    public DateTime EndTime { get; set; }

    [JsonPropertyName("isAvailable")]
    public bool IsAvailable { get; set; }
}