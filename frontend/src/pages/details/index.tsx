import Patient_Profile from '@/components/details/patient_profile';
import { Link, useSearchParams } from 'react-router-dom';
import { DataTable } from './data-table';
import { columns } from './columns';
import { _SCAN } from '@/types';
import { useEffect, useState } from 'react';
import { getScans } from '@/services/backend';
import Summary from './summary';

const Details = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;
  const [scans, setScans] = useState<_SCAN[]>([]);

  useEffect(() => {
    async function fetchScans() {
      const response = await getScans(patientId);
      setScans(response);
    }

    fetchScans();
  }, []);

  return (
    <div>
      <div className='m-5 grid grid-cols-3 gap-6'>
        <Patient_Profile patientId={patientId} />
        <div className='mt-4'>
          <Link
            to={`/add-scan?patient=${patientId}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add Scan
          </Link>
          <div className='mt-8'>
            <DataTable columns={columns} data={scans} />
          </div>
        </div>
      </div>
      <div>
        <Summary />
      </div>
    </div>
  );
};

export default Details;
