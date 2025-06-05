namespace MedicalApp.module.api.dtos;
public record VerifyCodeRequestDto
{
    public string Email { get; set; }
    public string Code { get; set; }
    public UserDto UserDto { get; set; }
}