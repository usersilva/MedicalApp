using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

public class ViewMedicalRecord
{
    private readonly IMedicalRecordRepository _medicalRecordRepository;
    private readonly IMapper _mapper;

    public ViewMedicalRecord(IMedicalRecordRepository medicalRecordRepository, IMapper mapper)
    {
        _medicalRecordRepository = medicalRecordRepository;
        _mapper = mapper;
    }

    public async Task<MedicalRecordDto> ExecuteAsync(int userId)
    {
        var record = await _medicalRecordRepository.GetByUserIdAsync(userId);
        if (record == null)
        {
            throw new KeyNotFoundException("Medical record not found.");
        }
        return _mapper.Map<MedicalRecordDto>(record);
    }
}