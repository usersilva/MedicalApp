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
    private readonly GetAllServices _getAllServices;
    private readonly SearchServicesByName _searchServicesByName;
    private readonly GetServiceById _getServiceById;
    private readonly GetAllSpecialities _getAllSpecialities;
    private readonly GetAllDoctors _getAllDoctors;


    public PatientController(LoginPatient loginPatient, ViewMedicalRecord viewMedicalRecord,
                              ViewAppointments viewAppointments, BookAppointment bookAppointment,
                              AddReview addReview, SearchDoctors searchDoctors, FilterDoctors filterDoctors,
                              IStringLocalizer<SharedResources> localizer,
                              GetAllServices getAllServices,
                              SearchServicesByName searchServicesByName,
                              GetServiceById getServiceById,
                              GetAllSpecialities getAllSpecialities,
                              GetAllDoctors getAllDoctors)
    {
        _loginPatient = loginPatient;
        _viewMedicalRecord = viewMedicalRecord;
        _viewAppointments = viewAppointments;
        _bookAppointment = bookAppointment;
        _addReview = addReview;
        _searchDoctors = searchDoctors;
        _filterDoctors = filterDoctors;
        _getAllServices = getAllServices;
        _searchServicesByName = searchServicesByName;
        _getServiceById = getServiceById;
        _localizer = localizer;
        _getAllSpecialities = getAllSpecialities;
        _getAllDoctors = getAllDoctors;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        try
        {
            var (token, user) = await _loginPatient.ExecuteAsync(request.Email, request.Password);
            Response.Headers["Authorization"] = $"Bearer {token}";
            return Ok(new { message = _localizer["LoginSuccessful"].Value, User = user, token = token});
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("medical-record/{userId}")]
    public async Task<IActionResult> GetMedicalRecord(int userId)
    {
        try
        {
            var record = await _viewMedicalRecord.ExecuteAsync(userId);
            if (record == null) return NotFound(new { message = _localizer["RecordNotFound"].Value });
            return Ok(record);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("appointments/{userId}")]
    public async Task<IActionResult> GetAppointments(int userId)
    {
        try
        {
            var appointments = await _viewAppointments.ExecuteAsync(userId);
            if (!appointments.Any()) return NotFound(new { message = _localizer["NoAppointments"].Value });
            return Ok(appointments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("book-appointment")]
    public async Task<IActionResult> BookAppointment([FromBody] BookAppointmentRequest request)
    {
        try
        {
            if (request == null || request.PatientId <= 0 || request.DoctorId <= 0 || request.ScheduleId <= 0)
            {
                return BadRequest(new { message = _localizer["InvalidAppointmentData"].Value });
            }
            await _bookAppointment.ExecuteAsync(request.PatientId, request.DoctorId, request.ScheduleId);
            return Ok(new { message = _localizer["AppointmentBooked"].Value });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("add-review")]
    public async Task<IActionResult> AddReview([FromBody] ReviewDto reviewDto)
    {
        try
        {
            if (reviewDto == null || string.IsNullOrWhiteSpace(reviewDto.Comment))
            {
                return BadRequest(new { message = _localizer["InvalidReviewData"].Value });
            }
            var review = await _addReview.ExecuteAsync(reviewDto);
            return Ok(new { message = _localizer["ReviewAdded"].Value, review });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("search-doctors")]
    public async Task<IActionResult> SearchDoctors(string query)
    {
        try
        {
            var doctors = await _searchDoctors.ExecuteAsync(query);
            if (!doctors.Any())
            {
                return NotFound(new { message = _localizer["NoResults"].Value });
            }
            return Ok(doctors);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("filter-doctors")]
    public async Task<IActionResult> FilterDoctors(string specialty)
    {
        try
        {
            var doctors = await _filterDoctors.ExecuteAsync(specialty);
            if (!doctors.Any())
            {
                return NotFound(new { message = _localizer["NoResults"].Value });
            }
            return Ok(doctors);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpGet("services")]
    public async Task<IActionResult> GetAllServices()
    {
        try
        {
            var services = await _getAllServices.ExecuteAsync();
            return Ok(services);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("doctors")]
    public async Task<IActionResult> GetAllDoctors()
    {
        try
        {
            var doctors = await _getAllDoctors.ExecuteAsync();
            return Ok(doctors);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("search-services")]
    public async Task<IActionResult> SearchServices([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return BadRequest(new { message = "Service name could not be empty." });

        try
        {
            var services = await _searchServicesByName.ExecuteAsync(name);
            return Ok(services);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("services/{id}")]
    public async Task<IActionResult> GetService(int id)
    {
        try
        {
            var service = await _getServiceById.ExecuteAsync(id);
            if (service == null) return NotFound(new { message = "Service not found." });
            return Ok(service);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
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
}