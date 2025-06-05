import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Сервис</h3>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:text-pink-300">О нас</Link></li>
            <li><Link to="/vacancies" className="hover:text-pink-300">Вакансии</Link></li>
            <li><Link to="/contacts" className="hover:text-pink-300">Контакты</Link></li>
            <li><Link to="/faq" className="hover:text-pink-300">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Пациенту</h3>
          <ul className="space-y-1">
            <li><Link to="/doctors" className="hover:text-pink-300">Врачи</Link></li>
            <li><Link to="/clinics" className="hover:text-pink-300">Клиники</Link></li>
            <li><Link to="/diagnostics" className="hover:text-pink-300">Диагностика</Link></li>
            <li><Link to="/services" className="hover:text-pink-300">Услуги</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Врачу и клинике</h3>
          <p>Личный кабинет</p>
          <p>Регистрация</p>
          <p className="mt-2">Пишите нам на <a href="mailto:info@health.by" className="hover:text-pink-300">info@health.by</a></p>
          <p>Звоните на 8 (029) 135-37-22</p>
          <p className="mt-2">© health.by 2025</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-pink-300">VK</a>
            <a href="#" className="hover:text-pink-300">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;