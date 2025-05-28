using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class GenerateReport
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IMapper _mapper;

    public GenerateReport(IAppointmentRepository appointmentRepository, IMapper mapper)
    {
        _appointmentRepository = appointmentRepository;
        _mapper = mapper;
    }

    public async Task<List<AppointmentDto>> ExecuteAsync(int doctorId)
    {
        var appointments = await _appointmentRepository.GetByDoctorIdAsync(doctorId);
        return _mapper.Map<List<AppointmentDto>>(appointments);
    }
}