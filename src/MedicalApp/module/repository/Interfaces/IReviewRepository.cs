using MedicalApp.module.repository.Models;

namespace MedicalApp.module.repository.Interfaces;

internal interface IReviewRepository : IRepository<Review>
{
    Task AddAsync(Review review);
}