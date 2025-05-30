using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class AppointmentConfig : IEntityTypeConfiguration<Appointment>
{
       public void Configure(EntityTypeBuilder<Appointment> builder)
       {
              builder.HasKey(a => a.Id);

              builder.Property(a => a.UserId)
                     .IsRequired();

              builder.Property(a => a.DoctorId)
                     .IsRequired();

              builder.Property(a => a.DateTime)
                     .IsRequired();

              builder.Property(a => a.Status)
                     .IsRequired()
                     .HasMaxLength(50)
                     .HasDefaultValue("Pending");
                     
              builder.HasOne(a => a.User)
                     .WithMany(u => u.Appointments)
                     .HasForeignKey(a => a.UserId)
                     .OnDelete(DeleteBehavior.Restrict);

              builder.HasOne(a => a.Doctor)
                     .WithMany(d => d.Appointments)
                     .HasForeignKey(a => a.DoctorId)
                     .OnDelete(DeleteBehavior.Restrict);

              builder.HasOne(a => a.MedicalRecord)
                     .WithMany(m => m.Appointments)
                     .HasForeignKey(a => a.UserId)
                     .OnDelete(DeleteBehavior.Cascade);
       }
}