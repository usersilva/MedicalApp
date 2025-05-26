using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;
internal class ScheduleConfig : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.HasKey(s => s.Id);
        builder.Property(s => s.DoctorId).IsRequired();
        builder.Property(s => s.StartTime).IsRequired();
        builder.Property(s => s.EndTime).IsRequired();
        builder.Property(s => s.IsAvailable).IsRequired().HasDefaultValue(true);

        builder.HasOne(s => s.Doctor)
               .WithMany()
               .HasForeignKey(s => s.DoctorId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}