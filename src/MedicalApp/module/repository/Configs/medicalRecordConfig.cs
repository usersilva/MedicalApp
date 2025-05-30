using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class MedicalRecordConfig : IEntityTypeConfiguration<MedicalRecord>
{
public void Configure(EntityTypeBuilder<MedicalRecord> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.UserId)
               .IsRequired()
               .ValueGeneratedNever();

        builder.Property(m => m.ChronicDiseases)
               .HasMaxLength(1000)
               .IsRequired()
               .HasDefaultValue("Нет данных");

        builder.Property(m => m.CurrentCondition)
               .HasMaxLength(500)
               .IsRequired()
               .HasDefaultValue("Нет данных");

        builder.Property(m => m.Recommendations)
               .HasMaxLength(1000)
               .IsRequired()
               .HasDefaultValue("Нет данных");

        builder.Property(m => m.LastUpdated)
               .IsRequired()
               .HasDefaultValueSql("CURRENT_TIMESTAMP");

        builder.HasOne(m => m.User)
               .WithOne(u => u.MedicalRecord)
               .HasForeignKey<MedicalRecord>(m => m.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.Appointments)
               .WithOne(a => a.MedicalRecord)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(m => m.UserId)
               .IsUnique();
    }
}