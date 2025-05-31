using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class ServiceConfig : IEntityTypeConfiguration<Service>
{
       public void Configure(EntityTypeBuilder<Service> builder)
       {
              builder.HasKey(s => s.Id);

              builder.Property(s => s.Name)
                     .IsRequired()
                     .HasMaxLength(100);

              builder.Property(s => s.Price)
                     .IsRequired()
                     .HasColumnType("decimal(18,2)");

              builder.HasIndex(s => s.Name)
                  .IsUnique();

              builder.HasMany(s => s.DoctorServices)
                  .WithOne(ds => ds.Service)
                  .HasForeignKey(ds => ds.ServiceId)
                  .OnDelete(DeleteBehavior.Cascade);
    }
}