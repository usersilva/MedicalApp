using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;
using Microsoft.EntityFrameworkCore;

namespace MedicalApp.module.repository.Repos;

internal class RepositoryBase<T> : IRepository<T> where T : class
{
    protected readonly MedicalAppContext _context;
    protected readonly DbSet<T> _dbSet;

    public RepositoryBase(MedicalAppContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public virtual Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public virtual Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public virtual Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}