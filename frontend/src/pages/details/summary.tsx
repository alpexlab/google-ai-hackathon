import Markdown from 'react-markdown';

const Summary = ({ summary }: { summary: string | undefined }) => {
  return (
    <div className='mx-auto p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <h5 className='mb-2 text-3xl font-bold text-gray-900 dark:text-white'>Summary of Scans</h5>
      <span className='text-sm text-gray-500 dark:text-gray-400'>Generated Using Gemini</span>
      <div className='mt-5 text-base text-gray-500 sm:text-lg dark:text-gray-400 max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded overflow-y-auto p-2'>
        <Markdown className={'text-left text-sm'}>{summary || 'No summary available'}</Markdown>
      </div>
    </div>
  );
};

export default Summary;
