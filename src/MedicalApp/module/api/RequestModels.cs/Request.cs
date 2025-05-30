using System.Text.Json.Serialization;

namespace MedicalApp.module.api.RequestModels;

public record LoginRequest
{
    [JsonPropertyName("email")]
    public string Email { get; set; }
    [JsonPropertyName("password")]
    public string Password { get; set; }
}
public record BookAppointmentRequest
{
    [JsonPropertyName("patientId")]
    public int PatientId { get; set; }
    [JsonPropertyName("doctorId")]
    public int DoctorId { get; set; }
    [JsonPropertyName("ScheduleId")]
    public int ScheduleId { get; set; }
}