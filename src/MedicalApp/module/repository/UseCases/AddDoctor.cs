using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.UseCases;

public class AddDoctor
{
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;
    private readonly ISpecialityRepository _specialityRepository;

    public AddDoctor(IDoctorRepository doctorRepository, IMapper mapper, ISpecialityRepository specialityRepository)
    {
        _doctorRepository = doctorRepository;
        _mapper = mapper;
        _specialityRepository = specialityRepository;
    }

    public async Task<DoctorDto> ExecuteAsync(DoctorDto doctorDto)
    {
        if (doctorDto.speciality != null && !string.IsNullOrWhiteSpace(doctorDto.speciality.Name))
        {
            var specialty = await _specialityRepository.GetByNameAsync(doctorDto.speciality.Name) 
                ?? new Speciality { Name = doctorDto.speciality.Name };
            if (specialty.Id == 0) await _specialityRepository.AddAsync(specialty);
            doctorDto.speciality.Id = specialty.Id;
        }

        var doctor = _mapper.Map<Doctor>(doctorDto);
        await _doctorRepository.AddAsync(doctor);
        return _mapper.Map<DoctorDto>(doctor);
    }
}