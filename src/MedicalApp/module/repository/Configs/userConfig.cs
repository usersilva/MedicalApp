using MedicalApp.module.repository.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicalApp.module.repository.Configs;

internal class UserConfig : IEntityTypeConfiguration<User>
{
       public void Configure(EntityTypeBuilder<User> builder)
       {
              builder.HasKey(u => u.Id);

              builder.Property(u => u.Name)
                     .IsRequired()
                     .HasMaxLength(50);

              builder.Property(u => u.LastName)
                     .IsRequired()
                     .HasMaxLength(50);

              builder.Property(u => u.Email)
                     .IsRequired()
                     .HasMaxLength(100);

              builder.Property(u => u.PasswordHash)
                     .IsRequired()
                     .HasMaxLength(256);

              builder.Property(u => u.Role)
                     .HasMaxLength(20)
                     .HasDefaultValue("Patient");

              builder.HasIndex(u => u.Email)
                     .IsUnique();

              builder.HasOne(u => u.MedicalRecord)
                     .WithOne(m => m.User)
                     .HasForeignKey<MedicalRecord>(m => m.UserId)
                     .OnDelete(DeleteBehavior.Cascade);

              builder.HasMany(u => u.Appointments)
                     .WithOne(a => a.User)
                     .HasForeignKey(a => a.UserId)
                     .OnDelete(DeleteBehavior.Cascade);
       }
}