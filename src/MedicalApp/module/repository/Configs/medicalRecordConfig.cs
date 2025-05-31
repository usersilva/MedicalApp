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

              builder.HasOne(mr => mr.User)
                  .WithOne(u => u.MedicalRecord)
                  .HasForeignKey<MedicalRecord>(mr => mr.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
    }
}