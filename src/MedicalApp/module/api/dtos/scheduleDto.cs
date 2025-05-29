using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public class ScheduleDto
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

    [JsonPropertyName("doctor")]
    public DoctorDto? Doctor { get; set; }
}