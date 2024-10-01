import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSurvivalResponse } from '@/services/backend';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { _SURVIVAL } from '@/types';
import Markdown from 'react-markdown';

const SurvivalCalculator = ({ patientId }: { patientId: string }) => {
  const [form, setForm] = useState<_SURVIVAL>({
    tstage: '',
    nstage: '',
    mstage: '',
    type: '',
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!form.tstage || !form.nstage || !form.mstage || !form.type) {
      setResult('Fill all the fields!');
      return;
    }

    setLoading(true);

    try {
      let res = await getSurvivalResponse(form, patientId);
      setResult(res);
    } catch (e) {
      setResult('No response from server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Risk Calculator
        </button>
      </DialogTrigger>
      <DialogContent className='w-[600px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded p-6'>
        {' '}
        {/* Adjusted width and height */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='tstage' className='text-lg'>
              T Stage
            </Label>
            <Input
              id='tstage'
              type='number'
              value={form.tstage}
              onChange={(e) => setForm({ ...form, tstage: e.target.value })}
            />
          </div>

          {/* N Stage */}
          <div className='space-y-2'>
            <Label htmlFor='nstage' className='text-lg'>
              N Stage
            </Label>
            <Input
              id='nstage'
              type='number'
              value={form.nstage}
              onChange={(e) => setForm({ ...form, nstage: e.target.value })}
            />
          </div>

          {/* M Stage */}
          <div className='space-y-2'>
            <Label htmlFor='mstage' className='text-lg'>
              M Stage
            </Label>
            <Input
              id='mstage'
              type='number'
              value={form.mstage}
              onChange={(e) => setForm({ ...form, mstage: e.target.value })}
            />
          </div>

          {/* Cancer Type */}
          <div className='space-y-2'>
            <Label htmlFor='type' className='text-lg'>
              Cancer Type
            </Label>
            <Input
              id='type'
              type='text'
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} disabled={loading} className='w-full'>
            {loading ? 'Loading...' : 'Analyze'}
          </Button>

          {/* Result */}
          <div className='mt-6 text-lg text-center'>
            <Markdown className={'text-left text-sm'}>{result}</Markdown>
          </div>
        </div>
        <DialogFooter>
          <span className='text-sm'>Powered by Gemini</span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SurvivalCalculator;
