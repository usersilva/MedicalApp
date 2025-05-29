using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;
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
    private readonly ISpecialityRepository _specialityRepository;

    public AdminController(AddDoctor addDoctor, GenerateReport generateReport,
                            AddSchedule addSchedule, LoginPatient loginAdmin,
                            GetAllSpecialities getAllSpecialities,
                            AddSpeciality addSpeciality,
                            ISpecialityRepository specialityRepository,
                            IStringLocalizer<AdminController> localizer)
    {
        _addDoctor = addDoctor;
        _generateReport = generateReport;
        _addSchedule = addSchedule;
        _loginAdmin = loginAdmin;
        _getAllSpecialities = getAllSpecialities;
        _addSpeciality = addSpeciality;
        _specialityRepository = specialityRepository;
        _localizer = localizer;
    }

    [HttpPost("add-speciality")]
    public async Task<IActionResult> AddSpeciality([FromBody] SpecialityDto specialityDto)
    {
        var doctor = await _addSpeciality.ExecuteAsync(specialityDto);
        return Ok(new { message = _localizer["SpecialityAdded"].Value, doctor });
    }

    [HttpGet("specialities")]
    public async Task<IActionResult> GetAllSpecialities()
    {
        var specialities = await _getAllSpecialities.ExecuteAsync();
        return Ok(specialities);
    }

    [HttpPost("add-doctor")]
    public async Task<IActionResult> AddDoctor([FromBody] DoctorDto doctorDto)
    {
        if (doctorDto == null || string.IsNullOrWhiteSpace(doctorDto.Name) || string.IsNullOrWhiteSpace(doctorDto.Email))
        {
            return BadRequest("Invalid doctor data.");
        }

        if (doctorDto.speciality != null && !string.IsNullOrWhiteSpace(doctorDto.speciality.Name))
        {
            var existingSpecialty = await _specialityRepository.GetByNameAsync(doctorDto.speciality.Name);
            if (existingSpecialty == null)
            {
                return BadRequest($"Specialty '{doctorDto.speciality.Name}' does not exist.");
            }
            doctorDto.speciality.Id = existingSpecialty.Id;
        }

        var addedDoctor = await _addDoctor.ExecuteAsync(doctorDto);
        return CreatedAtAction(nameof(AddDoctor), new { id = addedDoctor.Id }, addedDoctor);
    }

    [HttpGet("generate-report/{doctorId}")]
    public async Task<IActionResult> GenerateReport(int doctorId)
    {
        var report = await _generateReport.ExecuteAsync(doctorId);
        return Ok(report);
    }

    [HttpPost("add-schedule")]
    public async Task<IActionResult> AddSchedule([FromBody] ScheduleDto scheduleDto)
    {
        var schedule = await _addSchedule.ExecuteAsync(scheduleDto);
        return Ok(new { message = _localizer["ScheduleAdded"].Value, schedule });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var admin = await _loginAdmin.ExecuteAsync(request.Email, request.Password);
        return Ok(new { message = _localizer["LoginSuccessful"].Value, admin });
    }
}