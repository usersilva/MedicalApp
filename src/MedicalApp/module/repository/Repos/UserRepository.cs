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
        var user = await _dbSet.FindAsync(id);
        if (user == null)
            throw new KeyNotFoundException($"User with ID {id} not found.");
        return user;
    }
}