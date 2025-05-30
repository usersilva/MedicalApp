using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using MedicalApp.Resources;


namespace MedicalApp.module.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GuestController : ControllerBase
{
    private readonly SearchDoctors _searchDoctors;
    private readonly FilterDoctors _filterDoctors;
    private readonly RegisterPatient _registerPatient;
    private readonly IStringLocalizer<SharedResources> _localizer;

    public GuestController(SearchDoctors searchDoctors, FilterDoctors filterDoctors, RegisterPatient registerPatient, IStringLocalizer<SharedResources> localizer)
    {
        _searchDoctors = searchDoctors;
        _filterDoctors = filterDoctors;
        _registerPatient = registerPatient;
        _localizer = localizer;
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

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        try
        {
            if (userDto == null || string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.LastName) ||
                string.IsNullOrWhiteSpace(userDto.Email) || string.IsNullOrWhiteSpace(userDto.PasswordHash))
            {
                return BadRequest(new { message = _localizer["AllFieldsRequired"].Value });
            }
            var user = await _registerPatient.ExecuteAsync(userDto);
            if (user is IDictionary<string, object> errorResult && errorResult.ContainsKey("message"))
            {
                return BadRequest(new { message = errorResult["message"]?.ToString() });
            }
            return Ok(new { message = _localizer["RegistrationSuccessful"].Value, user });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }
}
