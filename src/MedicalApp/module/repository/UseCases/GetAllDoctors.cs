using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GetAllDoctors
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;

    public GetAllDoctors(IDoctorRepository doctorRepository, IMapper mapper)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
    }

    public async Task<List<DoctorDto>> ExecuteAsync()
    {
        var doctors = await _doctorRepository.GetAllAsync();
        return _mapper.Map<List<DoctorDto>>(doctors);
    }
}