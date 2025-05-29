// using MedicalApp.module.api.dtos;
// using MedicalApp.module.repository.Repos;
// using MedicalApp.module.repository.Repos;
// using MedicalApp.module.repository.Models;
// namespace MedicalApp.module.api.Extensions;
// private async Task<int> ResolveSpecialtyId(SpecialityDto specialityDto)
// {
//     private readonly ISpecialityRepository _specialtyRepository;
//     if (specialityDto == null || string.IsNullOrWhiteSpace(specialityDto.Name))
//     {
//         throw new ArgumentException("Specialty name cannot be empty.");
//     }

//     var specialty = await _specialtyRepository.GetByNameAsync(specialityDto.Name);
//     if (specialty == null)
//     {
//         specialty = new Speciality { Name = specialityDto.Name };
//         await _specialtyRepository.AddAsync(specialty);
//     }

//     return specialty.Id;
// }
// }