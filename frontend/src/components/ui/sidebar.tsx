const Sidebar = () => {
  return (
    <div className=' w-64 min-h-screen p-4 shadow-lg'>
      <ul className='text-black'>
        <li className='py-2'>
          <a href='#' className='flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-md'>
            <span>👤</span>
            <span>Patients</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
