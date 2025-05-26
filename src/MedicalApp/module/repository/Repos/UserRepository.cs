using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class UserRepository : RepositoryBase<User>, IUserRepository
{
    public UserRepository(MedicalAppContext context) : base(context)
    {
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }

    public override async Task<User?> GetByIdAsync(int id)
    {
        //TODO переделать реализацию
        return await _dbSet.FindAsync(id);
    }
}