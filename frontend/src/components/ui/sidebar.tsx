import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=' w-64 min-h-screen p-4 shadow-lg'>
      <ul className='text-black'>
        <li className='py-2'>
          <Link
            to={'/'}
            className='flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-md'
          >
            <span>👤</span>
            <span>Patients</span>
          </Link>
        </li>
        <li className='py-2'>
          <Link
            to={'/chat'}
            className='flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-md'
          >
            <span>💬</span>
            <span>Chat</span>
          </Link>
        </li>
        <li className='py-2'>
          <Link
            to={'/faq'}
            className='flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-md'
          >
            <span>❓</span>
            <span>FAQ</span>
          </Link>
        </li>
      </ul>
      <div className='text-gray-600'>
        <a
          href='https://github.com/alpexlab/google-ai-hackathon'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-2 p-2 hover:text-blue-500'
        >
          <Github className='w-5 h-5' />
          <span>Source</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
