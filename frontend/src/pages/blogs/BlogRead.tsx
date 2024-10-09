import Sidebar from '@/components/ui/sidebar';
import { User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogRead = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='w-full flex flex-col flex-1 p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-4xl font-bold mb-4 text-gray-800'>Title</h1>
        <p className='text-gray-500 mb-4 flex items-center'>
          <User className='mr-2' />
          <span className='font-semibold ml-[1/2]'>Dr. John Doe</span>
        </p>
        <div className='prose lg:prose-xl'>
          <ReactMarkdown>Hello</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
