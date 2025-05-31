using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GetAllServices
{
    private readonly IServiceRepository _serviceRepository;
    private readonly IMapper _mapper;

    public GetAllServices(IServiceRepository serviceRepository, IMapper mapper)
    {
        _serviceRepository = serviceRepository;
        _mapper = mapper;
    }

    public async Task<List<ServiceDto>> ExecuteAsync()
    {
        var services = await _serviceRepository.GetAllAsync();
        return _mapper.Map<List<ServiceDto>>(services);
    }
}