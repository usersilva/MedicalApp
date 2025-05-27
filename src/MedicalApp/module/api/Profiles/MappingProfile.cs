using AutoMapper;
using MedicalApp.module.repository.Models;
using MedicalApp.module.api.dtos;

namespace MedicalApp.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Doctor, DoctorDto>().ReverseMap();
        CreateMap<MedicalRecord, MedicalRecordDto>().ReverseMap();
        CreateMap<Appointment, AppointmentDto>().ReverseMap();
        CreateMap<Review, ReviewDto>().ReverseMap();
        CreateMap<Schedule, ScheduleDto>().ReverseMap();
    }
}