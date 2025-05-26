using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class MedicalRecordRepository : RepositoryBase<MedicalRecord>, IMedicalRecordRepository
{
    public MedicalRecordRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<MedicalRecord?> GetByUserIdAsync(int userId)
    {
        return await _dbSet.FirstOrDefaultAsync(m => m.UserId == userId);
    }
}