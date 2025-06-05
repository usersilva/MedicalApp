import { useParams } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import ReviewForm from '../components/ReviewForm';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';

const Speciality = () => {
  const { id } = useParams();
  const doctors = [
    { name: 'Иван Иванов', specialty: `Специальность ${id}`, schedule: ['10:00', '11:00'] },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Специальность {id}</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </div>
      <AppointmentForm />
      <ReviewForm />
      <Link to="/profile" className="link text-blue-500 mt-4 block">
        Личный кабинет
      </Link>
    </div>
  );
};

export default Speciality;