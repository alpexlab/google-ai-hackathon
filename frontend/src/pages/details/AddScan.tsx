import { BrainCard } from '@/components/details/brain_card';
import { BreastCard } from '@/components/details/breast_card';
import { LungCard } from '@/components/details/lung_card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';

const AddScan = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  return (
    <div className='flex-1 p-8'>
      <div className='grid grid-cols-3 gap-6'>
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
  );
};

export default AddScan;
