using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using Microsoft.Extensions.Logging;

namespace MedicalApp.module.repository.Services;

public class SpecialityResolver
{
    private readonly ISpecialityRepository _specialityRepository;
    private readonly ILogger<SpecialityResolver> _logger;

    public SpecialityResolver(ISpecialityRepository specialtyRepository, ILogger<SpecialityResolver> logger)
    {
        _specialityRepository = specialtyRepository;
        _logger = logger;
    }

    public async Task<int> ResolveSpecialtyId(SpecialityDto specialityDto)
    {
        if (specialityDto == null || string.IsNullOrWhiteSpace(specialityDto.Name))
        {
            _logger.LogWarning("Specialty name is null or empty, using default value (1).");
            return 1;
        }

        var speciality = await _specialityRepository.GetByNameAsync(specialityDto.Name);
        if (speciality == null)
        {
            _logger.LogInformation("Specialty {Name} not found, creating new.", specialityDto.Name);
            speciality = new Speciality { Name = specialityDto.Name };
            await _specialityRepository.AddAsync(speciality);
            await _specialityRepository.SaveChangesAsync();
        }
        return speciality.Id;
    }
}