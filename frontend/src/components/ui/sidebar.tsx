import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=' w-64 min-h-screen p-4 shadow-lg'>
      <ul className='text-black'>
        <li className='py-2'>
          <Link
            to={'/u'}
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
      </ul>
    </div>
  );
};

export default Sidebar;
