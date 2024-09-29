import { _BREAST_CANCER } from '@/types';
import { FileUpload } from '../ui/file-upload';
import { useState } from 'react';
import { Button } from '../ui/button';
import { createBreastCancer } from '@/services/backend';
import { useToast } from '@/hooks/use-toast';

export const BreastCard = ({ patientId }: { patientId: string }) => {
  const [cancer, setCancer] = useState<_BREAST_CANCER>({
    patient: patientId,
    mri: null,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createBreastCancer(cancer);
      toast({
        title: 'MRI Scan uploaded successfully',
      });

      setTimeout(() => {
        window.location.href = `/breast/${res.id}`;
      }, 500);
    } catch (e) {
      toast({
        title: 'Error uploading MRI Scan',
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='mx-auto '>
      <div className='m-5 font-bold'>Upload MRI Scans of the Breast</div>
      <div>
        <div className='w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
          <FileUpload
            onChange={(files: File[]) => {
              const mri = files[0];
              setCancer({ ...cancer, mri });
            }}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading} className='mt-5'>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};
