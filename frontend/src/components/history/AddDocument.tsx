import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createDocument } from '@/services/backend';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { _DOCUMENT } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

const AddDocument = ({ patientId }: { patientId: string }) => {
  const [form, setForm] = useState<_DOCUMENT>({
    comments: '',
    document: null,
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!form.comments || !form.document) {
      return;
    }

    setLoading(true);

    try {
      await createDocument(form, patientId);
      toast({
        title: 'Document uploaded successfully',
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      toast({
        title: 'Error uploading Document',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add Document
        </button>
      </DialogTrigger>
      <DialogContent className='w-[600px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded p-6'>
        <div>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='comments' className='text-lg'>
                Comments
              </Label>
              <Textarea
                id='comments'
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
              />
            </div>

            <div className='space-y-2'>
              <div className='space-y-2'>
                <Label htmlFor='document' className='text-lg'>
                  Medical Record
                </Label>
                <Input
                  id='document'
                  type={'file'}
                  onChange={(e) => setForm({ ...form, document: e.target.files?.[0] as File })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button onClick={handleSubmit} disabled={loading} className='w-full'>
              {loading ? 'Loading...' : 'Analyze'}
            </Button>
          </div>
          <DialogFooter>
            <span className='text-sm mt-2'>Powered by Gemini</span>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocument;
