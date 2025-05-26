using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;
internal interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task SaveChangesAsync();
}