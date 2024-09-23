import ReactPortal from '@/components/utils/ReactPortal';
import spinner from '@/assets/spinner.gif';

const FullPageLoader = () => {
  return (
    <>
      <ReactPortal>
        <div className='overlay' />
        <div className='modal'>
          <div className='flex flex-col-center'>
            <img className='w-[70px]' src={spinner} alt='Loading...' />
          </div>
        </div>
      </ReactPortal>
    </>
  );
};

export default FullPageLoader;
