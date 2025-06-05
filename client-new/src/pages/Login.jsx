import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login(email, password);
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }
      const user = response.data.user;
      if (!user) {
        throw new Error('User data missing in response');
      }
      const role = user.role?.toLowerCase() || 'patient';
      console.log(`User logged in with role: ${role}`);
      const redirectPath = role === 'admin' ? '/admin' : '/profile';
      navigate(redirectPath);
    } catch (err) {
      console.error('Login error:', err.message || err);
      if (err.response?.data?.message === 'Invalid credentials') {
        setError('Неверный email или пароль.');
      } else {
        setError('Ошибка входа. Проверьте email и пароль.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Вход</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            Войти
          </button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline font-medium">
              Зарегистрируйтесь
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;