using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Configs;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Services;

internal class MedicalAppContext : DbContext
{
    public MedicalAppContext(DbContextOptions<MedicalAppContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<MedicalRecord> MedicalRecords { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<DoctorService> DoctorServices { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Schedule> Schedules { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfig());
        modelBuilder.ApplyConfiguration(new DoctorConfig());
        modelBuilder.ApplyConfiguration(new MedicalRecordConfig());
        modelBuilder.ApplyConfiguration(new AppointmentConfig());
        modelBuilder.ApplyConfiguration(new DoctorServiceConfig());
        modelBuilder.ApplyConfiguration(new ServiceConfig());
        modelBuilder.ApplyConfiguration(new ReviewConfig());
        modelBuilder.ApplyConfiguration(new ScheduleConfig());

        base.OnModelCreating(modelBuilder);
    }
}
