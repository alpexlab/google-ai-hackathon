import { _PATIENT } from '@/types';

type _PROFILE = {
  details: {
    name: string;
    value: string | number;
  }[];
} & _PATIENT;

const Patient_Profile = ({ profile }: { profile: _PROFILE | undefined }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-200 p-4 rounded-lg shadow-md h-[400px]'>
      <div className='flex items-center'>
        <img src={profile.photo as string} alt={profile.name} className='rounded-full h-24 w-24' />
        <div className='ml-4'>
          <h3 className='text-xl font-semibold'>{profile.name}</h3>
          <p className='text-gray-500'>Registration Number: {profile.id}</p>
        </div>
      </div>
      <br />
      {profile.details.map((box, index) => (
        <div key={index} className='bg-white p-2 m-3 rounded-md '>
          <div className='text-lg font-bold'>{box.name}</div>
          <div className=''>{box.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Patient_Profile;
