using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

internal class AddDoctor
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;

    public AddDoctor(IDoctorRepository doctorRepository, IMapper mapper)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
    }

    public async Task<DoctorDto> ExecuteAsync(DoctorDto doctorDto)
    {
        var doctor = _mapper.Map<Doctor>(doctorDto);
        await _doctorRepository.AddAsync(doctor);
        await _doctorRepository.SaveChangesAsync();
        return _mapper.Map<DoctorDto>(doctor);
    }
}