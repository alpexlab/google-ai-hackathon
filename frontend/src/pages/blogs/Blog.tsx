import Sidebar from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react'; // Import the necessary Lucide icons

const blogs = [
  {
    id: 1,
    title: 'Understanding Cancer Treatment',
    author: 'Dr. Jane Smith',
    description: 'An overview of the latest treatments in cancer care and their efficacy...',
  },
  {
    id: 2,
    title: 'The Importance of Early Detection',
    author: 'Dr. John Doe',
    description:
      'Early detection of cancer can significantly improve treatment outcomes. Here’s why...',
  },
  // Add more blog entries as needed
];

const Blog = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='w-full flex flex-col flex-1 p-6'>
        <h1 className='text-3xl font-bold mb-6'>Case Studies</h1>
        <Link to={'/editor'} className='mb-4 inline-block text-blue-600 hover:underline'>
          Add New Blog
        </Link>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:shadow-xl hover:scale-105'
            >
              <div className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>{blog.title}</h2>
                <p className='text-gray-600 mb-2 flex items-center'>
                  <User className='mr-1' /> by {blog.author}
                </p>
                <p className='text-gray-700 mb-4'>{blog.description}</p>
                <Link
                  to={`/case-studies/${blog.id}`}
                  className='text-blue-500 hover:underline flex items-center'
                >
                  Read More <ArrowRight className='ml-1' />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
