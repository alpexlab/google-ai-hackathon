import { getPatient } from '@/services/backend';
import { _PATIENT } from '@/types';
import { useEffect, useState } from 'react';

type _PROFILE = {
  details: {
    name: string;
    value: string | number;
  }[];
} & _PATIENT;

const Patient_Profile = ({ patientId }: { patientId: string }) => {
  const [patient, setPatient] = useState<_PROFILE>();

  useEffect(() => {
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
    fetchPatient();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-200 p-4 rounded-lg shadow-md h-[400px]'>
      <div className='flex items-center'>
        <img src={patient.photo as string} alt={patient.name} className='rounded-full h-24 w-24' />
        <div className='ml-4'>
          <h3 className='text-xl font-semibold'>{patient.name}</h3>
          <p className='text-gray-500'>Registration Number: {patient.id}</p>
        </div>
      </div>
      <br />
      {patient.details.map((box, index) => (
        <div key={index} className='bg-white p-2 m-3 rounded-md '>
          <div className='text-lg font-bold'>{box.name}</div>
          <div className=''>{box.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Patient_Profile;
