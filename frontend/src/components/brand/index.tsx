import logo from '@/assets/logo.png';

const Brand = () => {
  return (
    <div>
      <a href='/' className='flex items-center justify-center flex-col'>
        <img src={logo} className='h-[100px]' alt='Repello AI Logo' />
        <h1 className='text-xl font-bold text-pink-600'>Google AI Hackathon</h1>
      </a>
    </div>
  );
};

export default Brand;
