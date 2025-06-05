import { useParams } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import ReviewForm from '../components/ReviewForm';

const Service = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Услуга {id}</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Стоимость: 50.00</p>
      </div>
      <AppointmentForm />
      <ReviewForm />
    </div>
  );
};

export default Service;