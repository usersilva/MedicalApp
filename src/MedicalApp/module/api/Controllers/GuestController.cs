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

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        var user = await _registerPatient.ExecuteAsync(userDto);
        return Ok(new { message = _localizer["RegistrationSuccessful"].Value, user });
    }
}