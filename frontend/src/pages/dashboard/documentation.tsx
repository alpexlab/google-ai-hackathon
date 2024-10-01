import { Download } from 'lucide-react';

export const documentationContent: {
  [key: string]: JSX.Element;
} = {
  api: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>API Integration Guide</h2>
      <p className='text-gray-700'>
        Learn how to integrate Canceralyze's API with your system for seamless cancer detection and
        reporting.
      </p>
    </div>
  ),
  model: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Model Training and Accuracy</h2>
      <p className='text-gray-700'>
        Details on the training process, dataset specifications, and accuracy of the Canceralyze
        model.
      </p>
    </div>
  ),
  security: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Data Security and Privacy</h2>
      <p className='text-gray-700'>
        Information about how Canceralyze ensures data security and compliance with privacy
        regulations.
      </p>
    </div>
  ),
  bestPractices: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Best Practices for Data Input</h2>
      <p className='text-gray-700'>
        Guidelines for preparing and inputting data for accurate cancer detection results.
      </p>
    </div>
  ),
  download_sample_images: (
    <div>
      <button
        className='flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all'
        onClick={() => {
          window.open(
            'https://drive.google.com/drive/folders/1W0aSYHvNeEFNJRDn4VgLAqZq0hG4LPos?usp=drive_link'
          );
        }}
      >
        <Download className='w-5 h-5' />
        Download
      </button>
    </div>
  ),
};
