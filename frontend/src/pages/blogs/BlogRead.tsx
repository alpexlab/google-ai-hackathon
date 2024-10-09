import Sidebar from '@/components/ui/sidebar';
import { getCaseStudy } from '@/services/backend';
import { _CASE_STUDY } from '@/types';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const BlogRead = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<_CASE_STUDY | null>(null);

  useEffect(() => {
    async function fetchCase() {
      const res = await getCaseStudy(id as string);
      setCaseStudy(res);
    }
    fetchCase();
  }, [id]);

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='w-full flex flex-col flex-1 p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-4xl font-bold mb-4 text-gray-800'>{caseStudy?.title}</h1>
        <p className='text-gray-500 mb-4 flex items-center'>
          <User className='mr-2' />
          <span className='font-semibold ml-[1/2]'>{caseStudy?.author}</span>
        </p>
        <div className='prose lg:prose-xl'>
          <ReactMarkdown>{caseStudy?.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
