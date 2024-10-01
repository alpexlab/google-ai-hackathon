import EasyNav from '@/components/breadcrumb';
import { BrainCard } from '@/components/details/brain_card';
import { BreastCard } from '@/components/details/breast_card';
import { LungCard } from '@/components/details/lung_card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { _PATIENT } from '@/types';
import { useSearchParams } from 'react-router-dom';

const AddScan = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  return (
    <div>
      <EasyNav patient={patientId} />
      <div className='m-5 grid grid-cols-3 gap-6'>
        <div className='flex-1 ml-4'>
          <div>
            <h1 className='w-[400px] mb-2'>Upload MRI Scan</h1>
            <Tabs defaultValue='brain' className='w-[400px]'>
              <TabsList>
                <TabsTrigger value='brain'>Brain</TabsTrigger>
                <TabsTrigger value='breast'>Breast</TabsTrigger>
                <TabsTrigger value='lungs'>Lungs</TabsTrigger>
              </TabsList>
              <TabsContent value='brain'>
                <BrainCard patientId={patientId} />
              </TabsContent>
              <TabsContent value='breast'>
                <BreastCard patientId={patientId} />
              </TabsContent>
              <TabsContent value='lungs'>
                <LungCard patientId={patientId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='w-[300px] ml-4 mt-20'>
          <Label htmlFor='width'>Medical Comments</Label>
          <Textarea className='col-span-2 mt-3 h-[150px]' />
        </div>
      </div>
    </div>
  );
};

export default AddScan;
