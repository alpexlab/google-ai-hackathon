export type report = {
  q: string;
  a: string;
};

const deets: report[] = [
  {
    q: 'Date of Birth',
    a: '12-2-2002',
  },
  {
    q: 'gender',
    a: 'Female',
  },
  {
    q: 'T Stage',
    a: 'T1',
  },
  {
    q: 'N Stage',
    a: 'N1',
  },
  {
    q: 'M Stage',
    a: 'M1',
  },
  {
    q: 'Prior Therapies',
    a: 'None',
  },
  {
    q: 'cT Stage',
    a: 'T2',
  },
];

const Patient_Profile = () => {
  return (
    <div className='bg-gray-200 p-6 rounded-lg shadow-md h-[800px]'>
      <div className='flex items-center'>
        <img
          src='https://img.freepik.com/free-photo/beautiful-woman-standing-against-yellow-wall_23-2148204587.jpg?size=626&ext=jpg'
          alt='Emily Johnson'
          className='rounded-full h-24 w-24'
        />
        <div className='ml-4'>
          <h3 className='text-xl font-semibold'>Emily Johnson</h3>
          <p className='text-gray-500'>Patient</p>
        </div>
      </div>
      <br />
      {deets.map((box, index) => (
        <div className='bg-white p-2 m-5 rounded-md '>
          <div className='text-lg font-bold'>{box.q}</div>
          <div className=''>{box.a}</div>
        </div>
      ))}
    </div>
  );
};

export default Patient_Profile;
