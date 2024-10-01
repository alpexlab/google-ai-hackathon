import Patient_Profile from '@/components/details/patient_profile';
import { Link, useSearchParams } from 'react-router-dom';
import { DataTable } from './data-table';
import { getColumns } from './columns';
import { _PATIENT, _SCAN } from '@/types';
import { useEffect, useState } from 'react';
import { getPatient, getScans } from '@/services/backend';
import Summary from './summary';
import EasyNav from '@/components/breadcrumb';

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
          name: 'Medical History',
          value: res.medical_history,
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
      <div className='m-5 grid grid-cols-3 gap-6'>
        <Patient_Profile profile={patient} />
        <div className='mt-4'>
          <Link
            to={`/add-scan?patient=${patientId}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add Scan
          </Link>
          <div className='mt-8'>
            <DataTable columns={getColumns(patientId)} data={scans} />
          </div>
        </div>
      </div>
      <div>
        <Summary summary={patient?.summary} />
      </div>
    </div>
  );
};

export default Details;
