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
               .IsRequired();

        builder.Property(m => m.CreationDate)
               .IsRequired();

        builder.Property(m => m.Diagnosis)
               .IsRequired()
               .HasMaxLength(500);

        builder.Property(m => m.IsActive)
               .IsRequired()
               .HasDefaultValue(false);

        builder.HasIndex(m => m.Id)
               .IsUnique();

        builder.HasOne(m => m.User)
               .WithOne(u => u.MedicalRecord)
               .HasForeignKey<MedicalRecord>(m => m.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}