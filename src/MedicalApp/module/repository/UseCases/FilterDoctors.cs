using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

internal class FilterDoctors
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;

    public FilterDoctors(IDoctorRepository doctorRepository, IMapper mapper)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
    }

    public async Task<List<DoctorDto>> ExecuteAsync(string specialty)
    {
        var doctors = await _doctorRepository.FilterAsync(specialty);
        return _mapper.Map<List<DoctorDto>>(doctors);
    }
}