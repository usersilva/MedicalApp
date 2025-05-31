using System.Text.Json.Serialization;

namespace MedicalApp.module.api.dtos;

public record MedicalRecordDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("userId")]
    public int UserId { get; set; }

    [JsonPropertyName("chronicDiseases")]
    public string? ChronicDiseases { get; set; }

    [JsonPropertyName("currentCondition")]
    public string? CurrentCondition { get; set; }

    [JsonPropertyName("recommendations")]
    public string? Recommendations { get; set; }

    [JsonPropertyName("lastUpdated")]
    public DateTime? LastUpdated { get; set; }
}