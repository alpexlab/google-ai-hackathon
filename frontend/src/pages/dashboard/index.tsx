import { Github } from 'lucide-react';
import FAQ from '../faq';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Shadcn Tabs
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { documentationContent } from './documentation';
import abhyuday from '@/assets/abhyuday.png';
import nikhil from '@/assets/nikhil.png';
import ayush from '@/assets/ayush.png';
import harshita from '@/assets/harshita.png';

const WelcomePage = () => {
  const [activeDoc, setActiveDoc] = useState<string>('api');

  const teamMembers = [
    { name: 'Abhyuday Singh', imageUrl: abhyuday },
    { name: 'Ayush Chaudhary', imageUrl: ayush },
    { name: 'Nikhil Mahajan', imageUrl: nikhil },
    { name: 'Harshita Singh', imageUrl: harshita },
  ];

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-blue-100'>
      {/* Main Content */}
      <main className='flex-grow flex flex-col items-center justify-center px-6 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-800 mb-6'>Welcome to Canceralyze</h1>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl'>
            Revolutionizing cancer detection with AI-powered solutions for early intervention.
          </p>
          <Link
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out'
            to='/u'
          >
            Go To Dashboard
          </Link>
        </div>

        {/* Hackathon Mention */}
        <div className='bg-blue-100 py-3 px-6 rounded-lg shadow-md text-center mb-12'>
          <p className='text-gray-700 text-sm font-medium'>
            Submission for <span className='font-bold'>Google AI Hackathon | Glance</span>
          </p>
        </div>

        {/* Demo Section */}
        <div className='w-full max-w-4xl px-4 mb-12'>
          <h2 className='text-3xl font-semibold text-center mb-6'>Demo Video</h2>
          <div className='flex justify-center'>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/w5ebcowAJD8'
              title='Canceralyze Demo'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='w-full max-w-4xl px-4 mb-12'>
          <Tabs defaultValue='faq' className='w-full'>
            {/* Tabs Navigation */}
            <TabsList className='flex justify-center space-x-4 mb-6 bg-inherit'>
              <TabsTrigger
                value='faq'
                className='px-6 py-2 text-lg font-semibold rounded-md bg-gray-200 hover:bg-gray-300'
              >
                FAQ
              </TabsTrigger>
              <TabsTrigger
                value='docs'
                className='px-6 py-2 text-lg font-semibold rounded-md bg-gray-200 hover:bg-gray-300'
              >
                Documentation
              </TabsTrigger>
            </TabsList>

            {/* FAQ Tab Content */}
            <TabsContent value='faq'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <FAQ />
              </div>
            </TabsContent>

            {/* Docs Tab Content with Dropdown */}
            <TabsContent value='docs'>
              <div className='bg-white p-12 rounded-lg shadow-lg'>
                <h2 className='text-3xl font-semibold mb-4'>Canceralyze Documentation</h2>
                <p className='text-gray-700 mb-4'>
                  Select a section from the dropdown to learn more about specific topics.
                </p>

                {/* Documentation Dropdown */}
                <div className='mb-6'>
                  <select
                    value={activeDoc}
                    onChange={(e) => setActiveDoc(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  >
                    <option value='api'>API Integration Guide</option>
                    <option value='model'>Model Training and Accuracy</option>
                    <option value='security'>Data Security and Privacy</option>
                    <option value='bestPractices'>Best Practices for Data Input</option>
                    <option value='download_sample_images'>Download Sample Images</option>
                  </select>
                </div>

                {/* Documentation Content Based on Selected Section */}
                <div className='p-3 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded'>
                  {documentationContent[activeDoc]}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Team Section */}
        <div className='w-full max-w-4xl px-4 mb-12'>
          <h2 className='text-3xl font-semibold text-center mb-6'>Meet the Team</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className='flex flex-col items-center bg-white p-6 rounded-lg shadow-lg'
              >
                <img
                  src={member.imageUrl}
                  alt={`${member.name}'s profile`}
                  className='w-24 h-24 rounded-full mb-4 object-cover'
                />
                <h3 className='text-xl font-semibold mb-2'>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='py-6 bg-gray-800 text-white'>
        <div className='flex justify-center'>
          <a
            href='https://github.com/alpexlab/google-ai-hackathon'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 hover:text-blue-400 transition duration-300 ease-in-out'
          >
            <Github className='w-5 h-5' />
            <span>Source</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
