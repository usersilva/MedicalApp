using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Services;

namespace MedicalApp.module.repository.UseCases;

public class AddDoctor
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;
    private readonly SpecialityResolver _specialityResolver;

    public AddDoctor(IDoctorRepository doctorRepository, IMapper mapper, SpecialityResolver specialityResolver)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
        _specialityResolver = specialityResolver;
    }

    public async Task<DoctorDto> ExecuteAsync(DoctorDto doctorDto)
    {
        if (doctorDto.speciality != null && !string.IsNullOrWhiteSpace(doctorDto.speciality.Name))
        {
            var specialtyId = await _specialityResolver.ResolveSpecialtyId(doctorDto.speciality);
            doctorDto.speciality.Id = specialtyId;
        }

        var doctor = _mapper.Map<Doctor>(doctorDto);
        if (doctorDto.speciality != null)
        {
            doctor.SpecialityId = doctorDto.speciality.Id;
        }

        await _doctorRepository.AddAsync(doctor);
        await _doctorRepository.SaveChangesAsync();
        return _mapper.Map<DoctorDto>(doctor);
    }
}