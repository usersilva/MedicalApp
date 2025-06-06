using MedicalApp.module.repository.UseCases;
using MedicalApp.module.api.dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using MedicalApp.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace MedicalApp.module.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GuestController : ControllerBase
{
    private readonly SearchDoctors _searchDoctors;
    private readonly FilterDoctors _filterDoctors;
    private readonly RegisterPatient _registerPatient;
    private readonly GetAllServices _getAllServices;
    private readonly SearchServicesByName _searchServicesByName;
    private readonly GetServiceById _getServiceById;
    private readonly GetAllSpecialities _getAllSpecialities;
    private readonly IStringLocalizer<SharedResources> _localizer;
    private readonly GetAllDoctors _getAllDoctors;
    private readonly GetDoctorById _getDoctorById;
    private readonly IConfiguration _configuration;

    private static readonly Dictionary<string, (string Code, UserDto UserDto, DateTime Timestamp)> _verificationCodes = new();
    private readonly TimeSpan _codeExpiration = TimeSpan.FromMinutes(10);

    public GuestController(
        SearchDoctors searchDoctors,
        FilterDoctors filterDoctors,
        RegisterPatient registerPatient,
        GetAllServices getAllServices,
        SearchServicesByName searchServicesByName,
        GetServiceById getServiceById,
        GetAllSpecialities getAllSpecialities,
        GetAllDoctors getAllDoctors,
        GetDoctorById getDoctorById,
        IStringLocalizer<SharedResources> localizer,
        IConfiguration configuration)
    {
        _searchDoctors = searchDoctors;
        _filterDoctors = filterDoctors;
        _registerPatient = registerPatient;
        _getAllServices = getAllServices;
        _searchServicesByName = searchServicesByName;
        _getServiceById = getServiceById;
        _getAllSpecialities = getAllSpecialities;
        _localizer = localizer;
        _getAllDoctors = getAllDoctors;
        _getDoctorById = getDoctorById;
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserDto userDto)
    {
        try
        {
            if (userDto == null || string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.LastName) ||
                string.IsNullOrWhiteSpace(userDto.Email) || string.IsNullOrWhiteSpace(userDto.PasswordHash))
            {
                return BadRequest(new { message = _localizer["AllFieldsRequired"].Value });
            }

            // Проверяем, существует ли email
            if (_registerPatient.IsEmailExists(userDto.Email).Result)
            {
                return BadRequest(new { message = _localizer["EmailExists"].Value });
            }

            // Генерируем код
            var random = new Random();
            var code = random.Next(100000, 999999).ToString();

            // Сохраняем код и данные пользователя
            _verificationCodes[userDto.Email] = (code, userDto, DateTime.UtcNow);

            // Настройка SMTP-клиента
            var smtpClient = new SmtpClient(_configuration["Smtp:Host"])
            {
                Port = int.Parse(_configuration["Smtp:Port"]),
                Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]),
                EnableSsl = bool.Parse(_configuration["Smtp:EnableSsl"] ?? "true"),
            };

            // Отправка email
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["Smtp:FromEmail"], "MedicalApp"),
                Subject = "Verification Code for Registration",
                Body = $"Your verification code is: {code}\nThis code is valid for 10 minutes.",
                IsBodyHtml = false,
            };
            mailMessage.To.Add(userDto.Email);

            smtpClient.Send(mailMessage);

            return Ok(new { message = _localizer["VerificationCodeSent"].Value });
        }
        catch (Exception ex)
        {
            if (_verificationCodes.TryGetValue(userDto?.Email, out var data))
            {
                Console.WriteLine($"Verification code for {userDto.Email}: {data.Code}");
            }
            return StatusCode(500, new { message = _localizer["InternalError"].Value, details = ex.Message });
        }
    }

    [HttpPost("verify-code")]
    public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeRequestDto request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request?.Email) || string.IsNullOrWhiteSpace(request?.Code))
            {
                return BadRequest(new { message = _localizer["AllFieldsRequired"].Value });
            }

            if (!_verificationCodes.TryGetValue(request.Email, out var storedData))
            {
                return BadRequest(new { message = _localizer["NoCodeFound"].Value });
            }

            if (DateTime.UtcNow - storedData.Timestamp > _codeExpiration)
            {
                _verificationCodes.Remove(request.Email);
                return BadRequest(new { message = _localizer["CodeExpired"].Value });
            }

            if (storedData.Code != request.Code)
            {
                return BadRequest(new { message = _localizer["InvalidCode"].Value });
            }

            // Регистрируем пользователя
            var user = await _registerPatient.ExecuteAsync(storedData.UserDto);

            _verificationCodes.Remove(request.Email);

            return Ok(new { message = _localizer["RegistrationSuccessful"].Value, user });
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
                return NotFound(new { message = _localizer["AllFieldsRequired"].Value });
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

    [HttpGet("doctors/{id}")]
    public async Task<IActionResult> GetDoctor(int id)
    {
        try
        {
            var doctor = await _getDoctorById.ExecuteAsync(id);
            if (doctor == null) return NotFound(new { message = "Doctor not found." });
            return Ok(doctor);
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
}

public class VerifyCodeRequestDto
{
    public string Email { get; set; }
    public string Code { get; set; }
}