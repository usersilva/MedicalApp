using AutoMapper;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class SearchServicesByName
{
    private readonly IServiceRepository _serviceRepository;
    private readonly IMapper _mapper;

    public SearchServicesByName(IServiceRepository serviceRepository, IMapper mapper)
    {
        _serviceRepository = serviceRepository;
        _mapper = mapper;
    }

    public async Task<List<ServiceDto>> ExecuteAsync(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Название услуги не может быть пустым.", nameof(name));

        var services = await _serviceRepository.FindByNameAsync(name);
        return _mapper.Map<List<ServiceDto>>(services);
    }
}