using AutoMapper;
using BCrypt.Net;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using Microsoft.Extensions.Localization;

namespace MedicalApp.module.repository.UseCases;

public class RegisterPatient
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IMedicalRecordRepository _medicalRecordRepository;
    private readonly IStringLocalizer<RegisterPatient> _localizer;

    public RegisterPatient(IUserRepository userRepository, IMapper mapper, IMedicalRecordRepository medicalRecordRepository, IStringLocalizer<RegisterPatient> localizer)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _medicalRecordRepository = medicalRecordRepository;
        _localizer = localizer;
    }
    public async Task<bool> IsEmailExists(string email)
    {
        return await _userRepository.GetByEmailAsync(email) != null;
    }

    public async Task<UserDto> ExecuteAsync(UserDto userDto)
    {
        var user = _mapper.Map<User>(userDto);
        if (await _userRepository.GetByEmailAsync(user.Email) != null)
        {
            throw new InvalidOperationException("Email already exists.");
        }

        user.Role = string.IsNullOrEmpty(userDto.Role) ? "Patient" : userDto.Role;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        if (user.Role == "Patient")
        {
            var medicalRecord = new MedicalRecord
            {
                UserId = user.Id,
                ChronicDiseases = _localizer["No data"],
                CurrentCondition = _localizer["No data"],
                Recommendations = _localizer["No data"],
                LastUpdated = DateTime.UtcNow
            };
            await _medicalRecordRepository.AddAsync(medicalRecord);
            await _medicalRecordRepository.SaveChangesAsync();
        }

        var result = _mapper.Map<UserDto>(user);
        return result;
    }
}