import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthProvider';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createCaseStudy } from '@/services/backend';
import EasyNav from '@/components/breadcrumb';
import { useNavigate } from 'react-router-dom';

const MdEditor = React.lazy(() => import('react-markdown-editor-lite'));

interface EditorChangeEvent {
  text: string;
  html: string;
}

const BlogEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { email } = useAuth();

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      await createCaseStudy({ title, description: content });
      navigate('/case-studies');
    } catch (error) {
      console.error('Error submitting blog', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = ({ text }: EditorChangeEvent): void => {
    setContent(text);
  };

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag='div' {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const allowedElements = [
    'p',
    'strong',
    'em',
    'blockquote',
    'code',
    'pre',
    'ul',
    'ol',
    'li',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ];

  return (
    <div>
      <EasyNav />
      <div className='p-6 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Create Case Study</h1>

        {/* Author info */}
        <div className='text-sm text-gray-500 mb-2'>Author: {email}</div>
        <div className='text-sm text-gray-500 mb-2'>
          Don't share personal details about the patient
        </div>

        {/* Blog Title */}
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter blog title'
          className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <div className='mb-4'>
          <Suspense fallback={<div>Loading editor...</div>}>
            <MdEditor
              value={content}
              style={{ height: '500px' }}
              renderHTML={(text: string) => (
                <ReactMarkdown components={components} allowedElements={allowedElements}>
                  {text}
                </ReactMarkdown>
              )}
              onChange={handleEditorChange}
            />
          </Suspense>
        </div>

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
