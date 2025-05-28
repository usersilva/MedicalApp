using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Localization;
using MedicalApp.Resources;

namespace MedicalApp.module.repository.UseCases;

public class LoginPatient
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly IStringLocalizer<SharedResources> _localizer;

    public LoginPatient(IUserRepository userRepository, IMapper mapper, IConfiguration configuration, IStringLocalizer<SharedResources> localizer)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _configuration = configuration;
        _localizer = localizer;
    }

    public async Task<object> ExecuteAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException(_localizer["InvalidCredentials"].Value);
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var role = user.Role ?? "Patient";
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Id.ToString()),
            new Claim(ClaimTypes.Role, role)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return new { Token = tokenString, User = _mapper.Map<UserDto>(user) };
    }
}