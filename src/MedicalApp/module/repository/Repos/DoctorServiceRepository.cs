using MedicalApp.module.repository.Models;
using MedicalApp.module.repository.Interfaces;
using MedicalApp.module.repository.Services;

namespace MedicalApp.module.repository.Repos;

internal class DoctorServiceRepository : RepositoryBase<DoctorService>, IDoctorServiceRepository
{
    public DoctorServiceRepository(MedicalAppContext context) : base(context)
    {
    }
}