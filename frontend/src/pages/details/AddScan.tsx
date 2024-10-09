import EasyNav from '@/components/breadcrumb';
import { BrainCard } from '@/components/details/brain_card';
import { BreastCard } from '@/components/details/breast_card';
import { GenomeCard } from '@/components/details/genome_card';
import { LungCard } from '@/components/details/lung_card';
import { SkinCard } from '@/components/details/skin_card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { _PATIENT } from '@/types';
import { useSearchParams } from 'react-router-dom';

const AddScan = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  return (
    <div>
      <EasyNav patient={patientId} />
      <div className='m-5'>
        <div className='ml-4'>
          <div>
            {/* <h1 className='w-[400px] mb-2'>Upload Scan</h1> */}
            <Tabs defaultValue='brain'>
              <TabsList>
                <TabsTrigger value='brain'>Brain</TabsTrigger>
                <TabsTrigger value='breast'>Breast</TabsTrigger>
                <TabsTrigger value='lungs'>Lungs</TabsTrigger>
                <TabsTrigger value='skin'>Skin</TabsTrigger>
                <TabsTrigger value='genome'>Genome</TabsTrigger>
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
              <TabsContent value='skin'>
                <SkinCard patientId={patientId} />
              </TabsContent>
              <TabsContent value='genome'>
                <GenomeCard patientId={patientId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScan;
