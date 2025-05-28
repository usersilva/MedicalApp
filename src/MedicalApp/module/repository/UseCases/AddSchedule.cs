using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class AddSchedule
{
    private readonly IScheduleRepository _scheduleRepository;
    private readonly IMapper _mapper;

    public AddSchedule(IScheduleRepository scheduleRepository, IMapper mapper)
    {
        _scheduleRepository = scheduleRepository;
        _mapper = mapper;
    }

    public async Task<ScheduleDto> ExecuteAsync(ScheduleDto scheduleDto)
    {
        var schedule = _mapper.Map<Schedule>(scheduleDto);
        await _scheduleRepository.AddAsync(schedule);
        await _scheduleRepository.SaveChangesAsync();
        return _mapper.Map<ScheduleDto>(schedule);
    }
}