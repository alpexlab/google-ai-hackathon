import Patient_Profile from '@/components/details/patient_profile';
import { Link, useSearchParams } from 'react-router-dom';

const Details = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;
  return (
    <div className='m-5 grid grid-cols-3 gap-6'>
      <Patient_Profile patientId={patientId} />
      <div className='mt-4'>
        <Link
          to={`/add-scan?patient=${patientId}`}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Scan
        </Link>
      </div>
    </div>
  );
};

export default Details;
