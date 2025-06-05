import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Speciality from './pages/Speciality';
import Service from './pages/Service';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/speciality/:id" element={<Speciality />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/admin/add-doctor" element={<div>Добавить врача (в разработке)</div>} />
            <Route path="/admin/add-speciality" element={<div>Добавить специальность (в разработке)</div>} />
            <Route path="/admin/add-service" element={<div>Добавить услугу (в разработке)</div>} />
            <Route path="/admin/add-schedule" element={<div>Добавить расписание (в разработке)</div>} />
            <Route path="/admin/generate-report" element={<div>Сгенерировать отчёт (в разработке)</div>} />
            <Route path="/admin/update-medical-record" element={<div>Обновить медкарту (в разработке)</div>} />
            <Route path="/admin/doctors" element={<div>Список врачей (в разработке)</div>} />
            <Route path="/admin/services" element={<div>Список услуг (в разработке)</div>} />
            <Route path="/admin/specialities" element={<div>Список специальностей (в разработке)</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;