using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record DoctorServiceDto
{
    [JsonPropertyName("doctorId")]
    public int DoctorId { get; set; }

    [JsonPropertyName("serviceId")]
    public int ServiceId { get; set; }
}