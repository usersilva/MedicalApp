using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int id);
}