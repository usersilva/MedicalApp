import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { verifyCode } from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Простая валидация email
    if (!email.includes('@') || !email.includes('.')) {
      setError('Введите корректный email-адрес.');
      return;
    }

    try {
      await register(name, lastName, email, password);
      setIsVerificationStep(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка отправки кода на email. Проверьте email.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setCodeError(null);

    try {
      await verifyCode(email, code);
      navigate('/login');
    } catch (err) {
      setCodeError(err.response?.data?.message || 'Неверный код или ошибка подтверждения.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {isVerificationStep ? 'Подтверждение Email' : 'Регистрация'}
        </h1>
        {!isVerificationStep ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                required
                placeholder="Введите имя"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Фамилия</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                required
                placeholder="Введите фамилию"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                required
                placeholder="Введите email"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                required
                placeholder="Введите пароль"
              />
            </div>
            {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Отправить код на Email
            </button>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline font-medium">
                Войти
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              Мы отправили код подтверждения на {email}
            </p>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Введите код
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                required
                placeholder="Введите код из письма"
              />
            </div>
            {codeError && <p className="text-red-500 dark:text-red-400 text-center">{codeError}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Подтвердить
            </button>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              <button
                type="button"
                onClick={() => setIsVerificationStep(false)}
                className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
              >
                Вернуться назад
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;