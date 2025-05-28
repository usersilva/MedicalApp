using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class ViewAppointments
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IMapper _mapper;

    public ViewAppointments(IAppointmentRepository appointmentRepository, IMapper mapper)
    {
        _appointmentRepository = appointmentRepository;
        _mapper = mapper;
    }

    public async Task<List<AppointmentDto>> ExecuteAsync(int userId)
    {
        var appointments = await _appointmentRepository.GetByUserIdAsync(userId);
        return _mapper.Map<List<AppointmentDto>>(appointments);
    }
}