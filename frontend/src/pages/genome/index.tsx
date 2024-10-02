import { FileUpload } from '@/components/ui/file-upload';
import { getGenomeResponse } from '@/services/backend';
import { useState } from 'react';
import Markdown from 'react-markdown';

const GenomePage = () => {
  const [result, setResult] = useState<string>('Upload Genome file!');

  const handleUpload = async () => {
    setResult('Loading...');
    let res = await getGenomeResponse();
    if (res) {
      setResult(res);
    } else {
      setResult('Something went wrong!');
    }
  };

  return (
    <div className='mt-6 flex flex-col justify-center items-center'>
      <h1 className='text-sm mb-3 text-center font-bold'>Genome Analysis</h1>
      <div className='w-[400px] mb-4 max-w-4xl mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
        <FileUpload onChange={handleUpload} />
      </div>
      <div className='w-[600px] mb-6'>
        <Markdown>{result}</Markdown>
      </div>
    </div>
  );
};

export default GenomePage;
