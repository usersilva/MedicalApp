using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GetServiceById
{
    private readonly IServiceRepository _serviceRepository;
    private readonly IMapper _mapper;

    public GetServiceById(IServiceRepository serviceRepository, IMapper mapper)
    {
        _serviceRepository = serviceRepository;
        _mapper = mapper;
    }

    public async Task<ServiceDto?> ExecuteAsync(int id)
    {
        var service = await _serviceRepository.GetByIdAsync(id);
        return service != null ? _mapper.Map<ServiceDto>(service) : null;
    }
}