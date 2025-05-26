using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
internal interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int id);
}