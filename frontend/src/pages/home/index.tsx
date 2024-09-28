import { columns } from './column';
import { DataTable } from './data-table';
import Sidebar from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { getPatients } from '@/services/backend';
import { _PATIENT } from '@/types';

const Home = () => {
  const [patients, setPatients] = useState<_PATIENT[]>([]);

  useEffect(() => {
    async function fetchPatients() {
      const res = await getPatients();
      setPatients(res);
    }

    fetchPatients();
  }, []);

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 container m-6 p-10'>
          <DataTable columns={columns} data={patients} />
        </div>
      </div>
    </>
  );
};

export default Home;
