import logo from '@/assets/logo.png';

const Brand = () => {
  return (
    <div>
      <a href='/' className='flex items-center justify-center flex-col'>
        <img src={logo} className='h-[50px]' alt='Logo' />
        <span className='text-sm text-center text-gray-700 mt-2'>
          Revolutionizing cancer detection
        </span>
      </a>
    </div>
  );
};

export default Brand;
