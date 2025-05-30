using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
using SendGrid.Helpers.Errors.Model;

namespace MedicalApp.module.repository.UseCases;

public class UpdateMedicalRecord
{
    private readonly IMedicalRecordRepository _medicalRecordRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UpdateMedicalRecord> _logger;

    public UpdateMedicalRecord(IMedicalRecordRepository medicalRecordRepository, IMapper mapper, ILogger<UpdateMedicalRecord> logger)
    {
        _medicalRecordRepository = medicalRecordRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<MedicalRecordDto> ExecuteAsync(int userId, MedicalRecordDto updatedRecordDto)
    {
        _logger.LogInformation("Updating medical record for user {UserId}", userId);
        var record = await _medicalRecordRepository.GetByUserIdAsync(userId);
        if (record == null)
        {
            _logger.LogWarning("Medical record for user {UserId} not found.", userId);
            throw new NotFoundException($"Medical record for user {userId} not found.");
        }

        record.ChronicDiseases = updatedRecordDto.ChronicDiseases ?? record.ChronicDiseases;
        record.CurrentCondition = updatedRecordDto.CurrentCondition ?? record.CurrentCondition;
        record.Recommendations = updatedRecordDto.Recommendations ?? record.Recommendations;
        record.LastUpdated = DateTime.UtcNow;

        await _medicalRecordRepository.UpdateAsync(record);
        await _medicalRecordRepository.SaveChangesAsync();

        _logger.LogInformation("Medical record updated for user {UserId}: {RecordId}", userId, record.Id);
        return _mapper.Map<MedicalRecordDto>(record);
    }
}