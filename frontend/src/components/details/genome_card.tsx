import { _GENOME } from '@/types';
import { FileUpload } from '../ui/file-upload';
import { useState } from 'react';
import { Button } from '../ui/button';
import { createGenome } from '@/services/backend';
import { useToast } from '@/hooks/use-toast';

export const GenomeCard = ({ patientId }: { patientId: string }) => {
  const [cancer, setCancer] = useState<_GENOME>({
    patient: patientId,
    vcf: null,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createGenome(cancer);
      toast({
        title: 'VCF uploaded successfully',
      });

      setTimeout(() => {
        window.location.href = `/genome/${res.id}/?patient=${patientId}`;
      }, 500);
    } catch (e) {
      toast({
        title: 'Error uploading VCF',
      });
      // window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className='ml-2 px-4 py-1 bg-yellow-200 text-black text-xs rounded-full'>Beta</span>
      <div className='mx-auto flex mt-4'>
        <div className='h-fit'>
          <div className='w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
            <FileUpload
              onChange={(files: File[]) => {
                const vcf = files[0];
                setCancer({ ...cancer, vcf });
              }}
              btn_name='Upload VCF'
            />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className='mt-5'>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};
