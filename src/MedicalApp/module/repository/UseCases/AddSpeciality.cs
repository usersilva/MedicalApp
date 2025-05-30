using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.UseCases;

public class AddSpeciality
{
    private readonly ISpecialityRepository _specialityRepository;
    private readonly IMapper _mapper;

    public AddSpeciality(ISpecialityRepository specialityRepository, IMapper mapper)
    {
        _specialityRepository = specialityRepository;
        _mapper = mapper;
    }

    public async Task<SpecialityDto> ExecuteAsync(SpecialityDto specialityDto)
    {
        var speciality = _mapper.Map<Speciality>(specialityDto);
        await _specialityRepository.AddAsync(speciality);
        await _specialityRepository.SaveChangesAsync();
        return _mapper.Map<SpecialityDto>(speciality);
    }
}