import { Link, useLocation } from 'react-router-dom';
import { User, MessageCircle, FileText } from 'lucide-react'; // Import icons from Lucide
import { useAuth } from '@/context/AuthProvider';

// Function to format the date to "ago" format
const timeAgo = (date: string | number | Date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${seconds} seconds ago`;
};

const Sidebar = () => {
  const location = useLocation();
  const { email, last_sign_in } = useAuth();

  return (
    <div className='w-[250px] min-h-screen bg-gray-100 p-4 shadow-lg'>
      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-gray-800'>User Info</h3>
        <p className='text-gray-700'>{email}</p>
        <p className='text-gray-500'>Last Login: {timeAgo(last_sign_in as string)}</p>
      </div>
      <div className='border-b border-gray-300 mb-4' />
      <ul className='text-black'>
        <li className='py-2'>
          <Link
            to={'/u'}
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ease-in-out ${location.pathname === '/u' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            aria-label='Patients Section'
          >
            <User className='text-lg' />
            <span className='font-medium'>Patients</span>
          </Link>
        </li>
        <li className='py-2'>
          <Link
            to={'/chat'}
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ease-in-out ${location.pathname === '/chat' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            aria-label='Chat Section'
          >
            <MessageCircle className='text-lg' />
            <span className='font-medium'>Chat</span>
          </Link>
        </li>
        <li className='py-2'>
          <Link
            to={'/case-studies'}
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ease-in-out ${location.pathname === '/case-studies' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            aria-label='Case Study Section'
          >
            <FileText size={24} color='currentColor' />
            <span className='font-medium'>Case Study</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
