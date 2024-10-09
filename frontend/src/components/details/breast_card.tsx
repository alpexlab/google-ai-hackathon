import { _BREAST_CANCER } from '@/types';
import { FileUpload } from '../ui/file-upload';
import { useState } from 'react';
import { Button } from '../ui/button';
import { createBreastCancer } from '@/services/backend';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export const BreastCard = ({ patientId }: { patientId: string }) => {
  const [cancer, setCancer] = useState<_BREAST_CANCER>({
    patient: patientId,
    mri: null,
    comments: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createBreastCancer(cancer);
      toast({
        title: 'Mammography uploaded successfully',
      });

      setTimeout(() => {
        window.location.href = `/breast/${res.id}/?patient=${patientId}`;
      }, 500);
    } catch (e) {
      toast({
        title: 'Error uploading Mammography',
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='mx-auto flex items-center'>
      {/* <div className='m-5 font-bold'>Upload MRI Scans of the Breast</div> */}
      <div className='h-fit'>
        <div className='w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
          <FileUpload
            onChange={(files: File[]) => {
              const mri = files[0];
              setCancer({ ...cancer, mri });
            }}
            btn_name='Upload Mammography'
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading} className='mt-5'>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
      <div className='w-[300px] ml-4 h-fit'>
        <Label htmlFor='width'>Medical Comments</Label>
        <Textarea
          className='col-span-2 mt-3 h-[150px]'
          onChange={(e) => setCancer({ ...cancer, comments: e.target.value })}
        />
      </div>
    </div>
  );
};
