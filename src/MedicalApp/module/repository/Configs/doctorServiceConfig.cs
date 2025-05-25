using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class DoctorServiceConfig : IEntityTypeConfiguration<DoctorService>
{
    public void Configure(EntityTypeBuilder<DoctorService> builder)
    {
        builder.HasKey(ds => new { ds.DoctorId, ds.ServiceId });

        builder.Property(ds => ds.DoctorId)
               .IsRequired();

        builder.Property(ds => ds.ServiceId)
               .IsRequired();

        builder.HasOne(ds => ds.Doctor)
               .WithMany(d => d.DoctorServices)
               .HasForeignKey(ds => ds.DoctorId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ds => ds.Service)
               .WithMany(s => s.DoctorServices)
               .HasForeignKey(ds => ds.ServiceId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}