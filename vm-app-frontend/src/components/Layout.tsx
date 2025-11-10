import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTheme } from '../hooks/useTheme';
import { toast, ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';
import Backdrop from './Backdrop';

interface LayoutProps { children: ReactNode }

export const Layout = ({ children }: LayoutProps) => {
  const [cookies,,removeCookie] = useCookies(['authToken']);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    removeCookie('authToken');
    toast.success('Logged out', { position: 'bottom-right', theme: 'dark' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Backdrop />
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-1 rounded">VM</span>
            <span>Dashboard</span>
          </Link>
          <nav className="flex items-center gap-4">
            {cookies.authToken && (
              <>
                <Link to="/vm" className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800">Launch VM</Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-sm"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            {cookies.authToken ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
              >Logout</button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">Login</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      <ToastContainer />
    </div>
  );
};
