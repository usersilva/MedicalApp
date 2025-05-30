using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using MedicalApp.module.api.RequestModels;


namespace MedicalApp.module.api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AddDoctor _addDoctor;
    private readonly GetAllSpecialities _getAllSpecialities;
    private readonly AddSpeciality _addSpeciality;
    private readonly GenerateReport _generateReport;
    private readonly AddSchedule _addSchedule;
    private readonly LoginPatient _loginAdmin;
    private readonly IStringLocalizer<AdminController> _localizer;
    private readonly SpecialityResolver _specialityResolver;
    private readonly UpdateMedicalRecord _updateMedicalRecord;

    public AdminController(AddDoctor addDoctor, GenerateReport generateReport,
                            AddSchedule addSchedule, LoginPatient loginAdmin,
                            GetAllSpecialities getAllSpecialities,
                            AddSpeciality addSpeciality,
                            SpecialityResolver specialityResolver,
                            IStringLocalizer<AdminController> localizer,
                            UpdateMedicalRecord updateMedicalRecord)
    {
        _addDoctor = addDoctor;
        _generateReport = generateReport;
        _addSchedule = addSchedule;
        _loginAdmin = loginAdmin;
        _getAllSpecialities = getAllSpecialities;
        _addSpeciality = addSpeciality;
        _specialityResolver = specialityResolver;
        _localizer = localizer;
        _updateMedicalRecord = updateMedicalRecord;
    }

    [HttpPost("add-speciality")]
    public async Task<IActionResult> AddSpeciality(SpecialityDto specialityDto)
    {
        try
        {
            if (specialityDto == null || string.IsNullOrWhiteSpace(specialityDto.Name))
            {
                return BadRequest(new { message = _localizer["InvalidSpecialityData"].Value });
            }
            var speciality = await _addSpeciality.ExecuteAsync(specialityDto);
            return Ok(new { message = _localizer["SpecialityAdded"].Value, speciality });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("specialities")]
    public async Task<IActionResult> GetAllSpecialities()
    {
        try
        {
            var specialities = await _getAllSpecialities.ExecuteAsync();
            return Ok(specialities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("add-doctor")]
    public async Task<IActionResult> AddDoctor([FromBody] DoctorDto doctorDto)
    {
        try
        {
            if (doctorDto == null || string.IsNullOrWhiteSpace(doctorDto.Name) || string.IsNullOrWhiteSpace(doctorDto.Email))
            {
                return BadRequest(new { message = _localizer["InvalidDoctorData"].Value });
            }

            if (doctorDto.speciality != null && !string.IsNullOrWhiteSpace(doctorDto.speciality.Name))
            {
                var specialtyId = await _specialityResolver.ResolveSpecialtyId(doctorDto.speciality);
                if (specialtyId == 0)
                {
                    return BadRequest(new { message = _localizer["SpecialtyNotResolved"].Value });
                }
                doctorDto.speciality.Id = specialtyId;
            }

            var addedDoctor = await _addDoctor.ExecuteAsync(doctorDto);
            return CreatedAtAction(nameof(AddDoctor), new { id = addedDoctor.Id }, addedDoctor);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("generate-report/{doctorId}")]
    public async Task<IActionResult> GenerateReport(int doctorId)
    {
        try
        {
            var report = await _generateReport.ExecuteAsync(doctorId);
            if (report == null) return NotFound(new { message = _localizer["ReportNotFound"].Value });
            return Ok(report);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("add-schedule")]
    public async Task<IActionResult> AddSchedule([FromBody] ScheduleDto scheduleDto)
    {
        try
        {
            if (scheduleDto == null || scheduleDto.DoctorId <= 0 || scheduleDto.StartTime == default)
            {
                return BadRequest(new { message = _localizer["InvalidScheduleData"].Value });
            }
            var schedule = await _addSchedule.ExecuteAsync(scheduleDto);
            return Ok(new { message = _localizer["ScheduleAdded"].Value, schedule });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request?.Email) || string.IsNullOrWhiteSpace(request?.Password))
            {
                return BadRequest(new { message = _localizer["AllFieldsRequired"].Value });
            }

            var result = await _loginAdmin.ExecuteAsync(request.Email, request.Password);
            if (result is BadRequestObjectResult badRequest)
            {
                return BadRequest(new { message = badRequest.Value?.ToString() });
            }

            var token = ((IDictionary<string, object>)result)["Token"]?.ToString();
            if (string.IsNullOrEmpty(token))
            {
                return StatusCode(500, new { message = _localizer["TokenGenerationFailed"].Value });
            }

            Response.Headers["Authorization"] = $"Bearer {token}";

            var user = ((IDictionary<string, object>)result)["User"] as UserDto;
            return Ok(new { message = _localizer["LoginSuccessful"].Value, User = user });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPut("update-medical-record/{userId}")]
    public async Task<IActionResult> UpdateMedicalRecord(int userId, [FromBody] MedicalRecordDto updatedRecord)
    {
        try
        {
            if (updatedRecord == null || string.IsNullOrWhiteSpace(updatedRecord.ChronicDiseases))
            {
                return BadRequest(new { message = _localizer["InvalidMedicalRecordData"].Value });
            }
            var updated = await _updateMedicalRecord.ExecuteAsync(userId, updatedRecord);
            return Ok(new { message = _localizer["MedicalRecordUpdated"].Value, record = updated });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }
}