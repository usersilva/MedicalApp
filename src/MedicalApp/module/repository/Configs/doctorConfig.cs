using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class DoctorConfig : IEntityTypeConfiguration<Doctor>
{
    public void Configure(EntityTypeBuilder<Doctor> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name)
               .IsRequired()
               .HasMaxLength(50);

        builder.Property(d => d.LastName)
               .IsRequired()
               .HasMaxLength(50);

        builder.Property(d => d.Specialty)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(d => d.Email)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(d => d.IsAvailable)
               .IsRequired()
               .HasDefaultValue(true);

        builder.HasIndex(d => d.Email)
               .IsUnique();

        builder.HasMany(d => d.Appointments)
               .WithOne(a => a.Doctor)
               .HasForeignKey(a => a.DoctorId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(d => d.DoctorServices)
               .WithOne(ds => ds.Doctor)
               .HasForeignKey(ds => ds.DoctorId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}