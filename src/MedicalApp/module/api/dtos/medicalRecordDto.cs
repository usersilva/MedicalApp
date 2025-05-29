using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public class MedicalRecordDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("userId")]
    public int UserId { get; set; }

    [JsonPropertyName("creationDate")]
    public DateTime CreationDate { get; set; }

    [JsonPropertyName("diagnosis")]
    public string Diagnosis { get; set; } = null!;

    [JsonPropertyName("isActive")]
    public bool IsActive { get; set; } = false;

    [JsonPropertyName("user")]
    public UserDto? User { get; set; }
}