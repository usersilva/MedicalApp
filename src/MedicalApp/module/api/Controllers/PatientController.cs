using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using MedicalApp.module.api.RequestModels;
using MedicalApp.Resources;

namespace MedicalApp.module.api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Patient")]
public class PatientController : ControllerBase
{
    private readonly LoginPatient _loginPatient;
    private readonly ViewMedicalRecord _viewMedicalRecord;
    private readonly ViewAppointments _viewAppointments;
    private readonly BookAppointment _bookAppointment;
    private readonly AddReview _addReview;
    private readonly SearchDoctors _searchDoctors;
    private readonly FilterDoctors _filterDoctors;
    private readonly IStringLocalizer<SharedResources> _localizer;

    public PatientController(LoginPatient loginPatient, ViewMedicalRecord viewMedicalRecord,
                              ViewAppointments viewAppointments, BookAppointment bookAppointment,
                              AddReview addReview, SearchDoctors searchDoctors, FilterDoctors filterDoctors,
                              IStringLocalizer<SharedResources> localizer)
    {
        _loginPatient = loginPatient;
        _viewMedicalRecord = viewMedicalRecord;
        _viewAppointments = viewAppointments;
        _bookAppointment = bookAppointment;
        _addReview = addReview;
        _searchDoctors = searchDoctors;
        _filterDoctors = filterDoctors;
        _localizer = localizer;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _loginPatient.ExecuteAsync(request.Email, request.Password);
        return Ok(new { message = _localizer["LoginSuccessful"].Value, result });
    }

    [HttpGet("medical-record/{userId}")]
    public async Task<IActionResult> GetMedicalRecord(int userId)
    {
        var record = await _viewMedicalRecord.ExecuteAsync(userId);
        return Ok(record);
    }

    [HttpGet("appointments/{userId}")]
    public async Task<IActionResult> GetAppointments(int userId)
    {
        var appointments = await _viewAppointments.ExecuteAsync(userId);
        return Ok(appointments);
    }

    [HttpPost("book-appointment")]
    public async Task<IActionResult> BookAppointment([FromBody] BookAppointmentRequest request)
    {
        await _bookAppointment.ExecuteAsync(request.PatientId, request.DoctorId, request.ScheduleId);
        return Ok(new { message = _localizer["AppointmentBooked"].Value });
    }

    [HttpPost("add-review")]
    public async Task<IActionResult> AddReview([FromBody] ReviewDto reviewDto)
    {
        var review = await _addReview.ExecuteAsync(reviewDto);
        return Ok(new { message = _localizer["ReviewAdded"].Value, review });
    }

    [HttpGet("search-doctors")]
    public async Task<IActionResult> SearchDoctors(string query)
    {
        var doctors = await _searchDoctors.ExecuteAsync(query);
        if (!doctors.Any())
        {
            return NotFound(new { message = _localizer["NoResults"].Value });
        }
        return Ok(doctors);
    }

    [HttpGet("filter-doctors")]
    public async Task<IActionResult> FilterDoctors(string specialty)
    {
        var doctors = await _filterDoctors.ExecuteAsync(specialty);
        if (!doctors.Any())
        {
            return NotFound(new { message = _localizer["NoResults"].Value });
        }
        return Ok(doctors);
    }
}