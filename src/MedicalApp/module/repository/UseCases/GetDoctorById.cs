using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GetDoctorById
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;

    public GetDoctorById(IDoctorRepository doctorRepository, IMapper mapper)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
    }

    public async Task<DoctorDto?> ExecuteAsync(int id)
    {
        var doctor = await _doctorRepository.GetByIdAsync(id);
        return doctor != null ? _mapper.Map<DoctorDto>(doctor) : null;
    }
}