import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addPatient } from '@/services/backend';
import { _PATIENT } from '@/types';
import { useState } from 'react';

export function AddPatient() {
  const [patient, setPatient] = useState<_PATIENT>({
    name: '',
    age: 45,
    email: '',
    photo: null,
    medical_history: '',
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    await addPatient(patient);
    toast({
      title: 'Patient Added',
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='bg-blue-600 text-white m-1'>
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[500px]'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Details</h4>
            <p className='text-sm text-muted-foreground'>Add details of the Patient</p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4 mb-3'>
              <Label htmlFor='width'>Name</Label>
              <Input
                id='width'
                value={patient.name}
                className='col-span-2 h-8'
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4 mb-3'>
              <Label htmlFor='maxWidth'>Age</Label>
              <Input
                id='maxWidth'
                type={'number'}
                value={patient.age}
                className='col-span-2 h-8'
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === '') value = '0';
                  setPatient({ ...patient, age: parseInt(value) });
                }}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4 mb-3'>
              <Label htmlFor='width'>Email</Label>
              <Input
                id='width'
                value={patient.email}
                type='email'
                className='col-span-2 h-8'
                onChange={(e) => setPatient({ ...patient, email: e.target.value })}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4 mb-3'>
              <Label htmlFor='width'>Photo</Label>
              <Input
                id='width'
                type='file'
                className='col-span-2 h-8'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPatient({ ...patient, photo: e.target.files?.[0] ?? null });
                }}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Medical Comments</Label>
              <Textarea
                id='width'
                value={patient.medical_history}
                className='col-span-2 h-8'
                onChange={(e) => setPatient({ ...patient, medical_history: e.target.value })}
              />
            </div>
          </div>

          <Button className='w-fit mx-auto mt-4' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
