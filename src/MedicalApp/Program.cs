using MedicalApp.module.repository.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// builder.Configuration.AddJsonFile("MedicalApp/src/MedicalApp/appsettings.json", optional: false, reloadOnChange: true);

builder.Services.AddControllers();

builder.Services.AddApplicationServices(builder.Configuration.GetConnectionString("DefaultConnection"), builder.Configuration);

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//app.UseHttpsRedirection();
app.UseRequestLocalization();
app.UseAuthentication();
app.UseAuthorization(); 
app.MapControllers(); 

app.Run();