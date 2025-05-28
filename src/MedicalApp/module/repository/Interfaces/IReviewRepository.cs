using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

public interface IReviewRepository : IRepository<Review>
{
    Task AddAsync(Review review);
}