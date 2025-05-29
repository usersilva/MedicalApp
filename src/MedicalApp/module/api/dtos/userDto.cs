using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record UserDto
{
    [JsonPropertyName("id")]
    public int Id { get; init; }
    [JsonPropertyName("name")]
    public string Name { get; init; }
    [JsonPropertyName("lastName")]
    public string LastName { get; init; }
    [JsonPropertyName("email")]
    public string Email { get; init; }
    [JsonPropertyName("passwordHash")]
    public string PasswordHash { get; init; }
    public string? Role;
    public MedicalRecordDto? MedicalRecord;
    public ICollection<AppointmentDto>? Appointments;
}