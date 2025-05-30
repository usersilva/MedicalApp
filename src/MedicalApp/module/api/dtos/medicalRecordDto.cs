using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record MedicalRecordDto
{
    [JsonPropertyName("id")]
    public int Id { get; init; }
    [JsonPropertyName("userId")]
    public int UserId { get; init; }
    [JsonPropertyName("chronicDiseases")]
    public string ChronicDiseases { get; init; }
    [JsonPropertyName("currentCondition")]
    public string CurrentCondition { get; init; }
    [JsonPropertyName("recommendations")]
    public string Recommendations { get; init; }
    [JsonPropertyName("lastUpdated")]
    public DateTime LastUpdated { get; init; }
}