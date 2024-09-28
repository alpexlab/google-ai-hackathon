import { useState } from 'react';
import { FileUpload } from '../ui/file-upload';

export const GenomeCard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <div className='mx-auto '>
      <div className='m-5 font-bold'>Upload the Genome</div>
      {/* <div>
                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleFileUpload} />
                </div>
            </div> */}
    </div>
  );
};
