using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;
using MedicalApp.module.repository.Interfaces;

namespace MedicalApp.module.repository.UseCases;

internal class AddReview
{
    private readonly IReviewRepository _reviewRepository;
    private readonly IMapper _mapper;

    public AddReview(IReviewRepository reviewRepository, IMapper mapper)
    {
        _reviewRepository = reviewRepository;
        _mapper = mapper;
    }

    public async Task<ReviewDto> ExecuteAsync(ReviewDto reviewDto)
    {
        var review = _mapper.Map<Review>(reviewDto);
        await _reviewRepository.AddAsync(review);
        await _reviewRepository.SaveChangesAsync();
        return _mapper.Map<ReviewDto>(review);
    }
}