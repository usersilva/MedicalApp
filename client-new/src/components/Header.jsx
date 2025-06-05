import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleDarkMode, darkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full header-gradient text-white shadow-lg z-10">
      <div className="container mx-auto p-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* <img src="/logo.png" alt="Logo" className="h-8 rounded-full" /> */}
          <h1 className="text-xl font-bold">Клиника Здоровье</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-bar">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Поиск врача или услуги..."
              className="search-input ml-2 w-40 md:w-64"
            />
          </div>
          <nav className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-gray-200 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/doctors')}
              className="text-white hover:text-gray-200 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/specialities')}
              className="text-white hover:text-gray-200 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332-.477-4.5-1.253" />
              </svg>
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-white hover:text-gray-200 transition-all duration-300"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                {user.role === 'Patient' && (
                  <button onClick={() => navigate('/profile')} className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </button>
                )}
                {user.role === 'Admin' && (
                  <button onClick={() => navigate('/admin')} className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                      alt="Admin Avatar"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </button>
                )}
                <button onClick={logout} className="text-white hover:text-gray-200 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                Войти
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;