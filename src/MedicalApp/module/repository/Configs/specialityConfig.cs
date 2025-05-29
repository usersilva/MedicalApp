using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Configs;

public class SpecialityConfig : IEntityTypeConfiguration<Speciality>
{
    public void Configure(EntityTypeBuilder<Speciality> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasMany(s => s.Doctors)
            .WithOne(d => d.Specialty)
            .HasForeignKey(d => d.SpecialityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}