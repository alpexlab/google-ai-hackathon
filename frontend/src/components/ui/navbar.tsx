import logo from '@/assets/logo.png';
import { SUPABASE } from '@/const';
import NotificationIcon from '../notifications';
import { useEffect, useState } from 'react';
import { getNotificationCount } from '@/services/backend';

const Navbar = () => {
  const handleLogout = () => {
    const project_id = SUPABASE.PROJECT_URL.split('https://')[1].split('.')[0];
    const key = `sb-${project_id}-auth-token`;
    localStorage.removeItem(key);
    window.location.reload();
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await getNotificationCount();
      setCount(res);
    }
    fetchNotifications();
  }, []);

  return (
    <nav className='bg-gray-800 p-2 px-6 flex justify-between items-center'>
      <div className='flex items-center'>
        <a href='/'>
          <img src={logo} className='h-[50px]' alt='Canceralyze' />
        </a>
      </div>
      <div className='space-x-4 flex items-center'>
        <NotificationIcon count={count} />
        <button
          className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
