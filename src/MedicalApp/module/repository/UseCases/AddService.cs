using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class AddService
{
    private readonly IServiceRepository _serviceRepository;
    private readonly IDoctorRepository _doctorRepository;
    private readonly IDoctorServiceRepository _doctorServiceRepository;
    private readonly IMapper _mapper;

    public AddService(
        IServiceRepository serviceRepository,
        IDoctorRepository doctorRepository,
        IDoctorServiceRepository doctorServiceRepository,
        IMapper mapper)
    {
        _serviceRepository = serviceRepository;
        _doctorRepository = doctorRepository;
        _doctorServiceRepository = doctorServiceRepository;
        _mapper = mapper;
    }

    public async Task<ServiceDto> ExecuteAsync(ServiceDto serviceDto)
    {
        if (serviceDto == null) throw new ArgumentNullException(nameof(serviceDto));
        if (string.IsNullOrWhiteSpace(serviceDto.Name)) throw new ArgumentException("Название услуги не может быть пустым.", nameof(serviceDto.Name));

        if (await _serviceRepository.ExistsByNameAsync(serviceDto.Name))
        {
            throw new InvalidOperationException("Услуга с таким именем уже существует.");
        }

        // if (serviceDto.DoctorIds != null && serviceDto.DoctorIds.Any())
        // {
        //     foreach (var doctorId in serviceDto.DoctorIds)
        //     {
        //         if (!await _doctorRepository.ExistsByIdAsync(doctorId))
        //         {
        //             throw new InvalidOperationException($"Доктор с ID {doctorId} не существует.");
        //         }
        //     }
        // }

        var service = _mapper.Map<Service>(serviceDto);
        if (service.Price <= 0) service.Price = 0m;

        var addedService = await _serviceRepository.AddAsync(service);

        if (serviceDto.DoctorIds != null && serviceDto.DoctorIds.Any())
        {
            foreach (var doctorId in serviceDto.DoctorIds)
            {
                var doctorService = new DoctorService
                {
                    DoctorId = doctorId,
                    ServiceId = addedService.Id
                };
                await _doctorServiceRepository.AddAsync(doctorService);
            }
        }

        var updatedService = await _serviceRepository.GetByIdAsync(addedService.Id);
        return _mapper.Map<ServiceDto>(updatedService);
    }
}