using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;

namespace MedicalApp.module.repository.Repos;

internal class ReviewRepository : RepositoryBase<Review>, IReviewRepository
{
    public ReviewRepository(MedicalAppContext context) : base(context)
    {
    }

    public override async Task AddAsync(Review review)
    {
        review.CreatedAt = DateTime.UtcNow;
        await base.AddAsync(review);
    }
}