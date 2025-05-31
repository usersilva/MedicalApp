using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Repos;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.UseCases;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

namespace MedicalApp.module.repository.Services;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, string connectionString, IConfiguration configuration)
    {
        services.AddDbContext<MedicalAppContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped(typeof(IRepository<>), typeof(RepositoryBase<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IDoctorRepository, DoctorRepository>();
        services.AddScoped<IMedicalRecordRepository, MedicalRecordRepository>();
        services.AddScoped<IAppointmentRepository, AppointmentRepository>();
        services.AddScoped<IDoctorServiceRepository, DoctorServiceRepository>();
        services.AddScoped<IServiceRepository, ServiceRepository>();
        services.AddScoped<IReviewRepository, ReviewRepository>();
        services.AddScoped<IScheduleRepository, ScheduleRepository>();
        services.AddScoped<ISpecialityRepository, SpecialityRepository>();

        services.AddScoped<RegisterPatient>();
        services.AddScoped<LoginPatient>();
        services.AddScoped<SearchDoctors>();
        services.AddScoped<FilterDoctors>();
        services.AddScoped<ViewMedicalRecord>();
        services.AddScoped<ViewAppointments>();
        services.AddScoped<BookAppointment>();
        services.AddScoped<AddReview>();
        services.AddScoped<AddDoctor>();
        services.AddScoped<GenerateReport>();
        services.AddScoped<AddSchedule>();
        services.AddScoped<GetAllSpecialities>();
        services.AddScoped<AddSpeciality>();
        services.AddScoped<SpecialityResolver>();
        services.AddScoped<UpdateMedicalRecord>();
        services.AddScoped<AddService>();
        services.AddScoped<SearchServicesByName>();
        services.AddScoped<GetAllServices>();
        services.AddScoped<GetServiceById>();

        services.AddAutoMapper(typeof(DependencyInjection)); 

        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

        services.AddLocalization(options => options.ResourcesPath = "src/MedicalApp/Resources");

        services.Configure<RequestLocalizationOptions>(options =>
        {
            var supportedCultures = new[]
            {
                new CultureInfo("en"),
                new CultureInfo("ru")
            };
            options.DefaultRequestCulture = new RequestCulture("ru");
            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
            options.RequestCultureProviders = new List<IRequestCultureProvider>
            {
                new QueryStringRequestCultureProvider(),
                new AcceptLanguageHeaderRequestCultureProvider()
            };
        });

        return services;
    }
}