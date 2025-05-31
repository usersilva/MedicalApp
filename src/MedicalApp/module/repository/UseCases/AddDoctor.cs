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
        if (doctorDto == null)
            throw new ArgumentNullException(nameof(doctorDto));
        if (string.IsNullOrWhiteSpace(doctorDto.Name))
            throw new ArgumentException("Имя доктора не может быть пустым.", nameof(doctorDto.Name));
        if (string.IsNullOrWhiteSpace(doctorDto.Email))
            throw new ArgumentException("EmailRequired", nameof(doctorDto.Email));

        var existingDoctor = await _doctorRepository.GetByEmailAsync(doctorDto.Email);
        if (existingDoctor != null)
            throw new InvalidOperationException("EmailAlreadyExists");

        int specialityId = doctorDto.SpecialityId ?? await _specialityResolver.ResolveSpecialtyId(new SpecialityDto { Name = doctorDto.Name });

        var doctor = _mapper.Map<Doctor>(doctorDto);
        doctor.SpecialityId = specialityId;
        await _doctorRepository.AddAsync(doctor);
        await _doctorRepository.SaveChangesAsync();

        var addedDoctor = await _doctorRepository.GetByIdAsync(doctor.Id);
        return _mapper.Map<DoctorDto>(addedDoctor);
    }
}