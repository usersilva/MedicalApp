using AutoMapper;
using BCrypt.Net;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

internal class RegisterPatient
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public RegisterPatient(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserDto> ExecuteAsync(UserDto userDto)
    {
        var user = _mapper.Map<User>(userDto);
        if (await _userRepository.GetByEmailAsync(user.Email) != null)
        {
            throw new InvalidOperationException("Email already exists.");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();
        return _mapper.Map<UserDto>(user);
    }
}