using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
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
    private readonly GenerateReport _generateReport;
    private readonly AddSchedule _addSchedule;
    private readonly LoginPatient _loginAdmin;
    private readonly IStringLocalizer<AdminController> _localizer;

    public AdminController(AddDoctor addDoctor, GenerateReport generateReport,
                            AddSchedule addSchedule, LoginPatient loginAdmin,
                            IStringLocalizer<AdminController> localizer)
    {
        _addDoctor = addDoctor;
        _generateReport = generateReport;
        _addSchedule = addSchedule;
        _loginAdmin = loginAdmin;
        _localizer = localizer;
    }

    [HttpPost("add-doctor")]
    public async Task<IActionResult> AddDoctor([FromBody] DoctorDto doctorDto)
    {
        var doctor = await _addDoctor.ExecuteAsync(doctorDto);
        return Ok(new { message = _localizer["DoctorAdded"].Value, doctor });
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