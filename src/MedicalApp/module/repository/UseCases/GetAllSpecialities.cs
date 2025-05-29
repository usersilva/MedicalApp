using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GetAllSpecialities
{
    private readonly ISpecialityRepository _specialityRepository;
    private readonly IMapper _mapper;

    public GetAllSpecialities(ISpecialityRepository specialityRepository, IMapper mapper)
    {
        _specialityRepository = specialityRepository;
        _mapper = mapper;
    }

    public async Task<List<SpecialityDto>> ExecuteAsync()
    {
        var specialities = await _specialityRepository.FindAllAsync();
        return _mapper.Map<List<SpecialityDto>>(specialities);
    }
}