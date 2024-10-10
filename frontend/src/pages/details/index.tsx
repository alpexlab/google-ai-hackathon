import Patient_Profile from '@/components/details/patient_profile';
import { Link, useSearchParams } from 'react-router-dom';
import { DataTable } from './data-table';
import { getColumns } from './columns';
import { _PATIENT, _SCAN } from '@/types';
import { useEffect, useState } from 'react';
import { getPatient, getScans } from '@/services/backend';
import Summary from './summary';
import EasyNav from '@/components/breadcrumb';
import SurvivalCalculator from '@/components/survival';
import AddDocument from '@/components/history/AddDocument';
import DocumentTable from '@/components/history/DocumentTable';

type _PROFILE = {
  details: {
    name: string;
    value: string | number;
  }[];
} & _PATIENT;

const Details = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;
  const [scans, setScans] = useState<_SCAN[]>([]);
  const [patient, setPatient] = useState<_PROFILE>();

  useEffect(() => {
    async function fetchScans() {
      const response = await getScans(patientId);
      setScans(response);
    }

    async function fetchPatient() {
      const res = await getPatient(patientId);
      const details = [
        {
          name: 'Email',
          value: res.email,
        },
        {
          name: 'Age',
          value: res.age,
        },
        {
          name: 'Created At',
          value: new Date(res.created_at).toLocaleString(),
        },
      ];

      res.photo =
        res.photo ||
        'https://img.freepik.com/free-photo/beautiful-woman-standing-against-yellow-wall_23-2148204587.jpg?size=626&ext=jpg';

      setPatient({ ...res, details });
    }

    fetchScans();
    fetchPatient();
  }, []);

  return (
    <div>
      <EasyNav patient={patientId} />

      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 m-5'>
        {/* Patient Profile Section */}
        <div className='md:col-span-4'>
          <h2 className='text-xl font-semibold mb-4'>Patient Profile</h2>
          <Patient_Profile profile={patient} />
          <div className='mt-4 flex items-center'>
            <Link
              to={`/medical-history?patient=${patientId}`}
              className='text-blue-500 hover:underline'
            >
              View Medical History
            </Link>
          </div>
        </div>

        {/* Actions and Cancer Report Section */}
        <div className='md:col-span-8'>
          {/* Action Buttons */}
          <div className='p-4 bg-white shadow rounded mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Actions</h2>
            <div className='flex space-x-4'>
              <Link
                to={`/add-scan?patient=${patientId}`}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Detect
              </Link>
              <AddDocument patientId={patientId} />
              <SurvivalCalculator patientId={patientId} />
            </div>
          </div>

          {/* Cancer Report */}
          <div className='p-4 bg-white shadow rounded'>
            <h2 className='text-xl font-semibold mb-4'>Cancer Report</h2>
            <DataTable columns={getColumns(patientId)} data={scans} />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 m-5 mt-6'>
        {/* Patient Profile Section */}
        <div className='md:col-span-4 p-4 bg-white shadow rounded h-fit'>
          <h2 className='text-xl font-semibold mb-4'>Medical Records</h2>
          <DocumentTable />
        </div>
        <div className='md:col-span-8'>
          <Summary summary={patient?.summary} />
        </div>
      </div>
    </div>
  );
};

export default Details;
