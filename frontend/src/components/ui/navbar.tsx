import logo from '@/assets/logo.png';
import { SUPABASE } from '@/const';

const Navbar = () => {
  const handleLogout = () => {
    const project_id = SUPABASE.PROJECT_URL.split('https://')[1].split('.')[0];
    const key = `sb-${project_id}-auth-token`;
    localStorage.removeItem(key);
    window.location.reload();
  };

  return (
    <nav className='bg-gray-800 p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <img src={logo} className='h-[50px]' alt='Repello AI Logo' />
      </div>
      <div className='space-x-4'>
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
