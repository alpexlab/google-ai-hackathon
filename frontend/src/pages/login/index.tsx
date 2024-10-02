import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supaclient } from '@/services/supabase';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Brand from '@/components/brand';
import './index.css';

// Sample cancer cell images URLs
const cellImages = ['/public/cancer_1.png', '/public/cancer_2.png', '/public/cancer_3.png'];

export default function Login() {
  const { email } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (email) {
      navigate('/u');
    }
    setShow(true);
  }, [email, navigate]);

  return (
    <>
      {show && (
        <div className='min-h-screen flex items-center justify-center relative bg-gray-50 overflow-hidden'>
          {/* Floating cells animation with images */}
          {cellImages.map((image, index) => (
            <div key={index} className='cell' style={{ backgroundImage: `url(${image})` }}></div>
          ))}

          <div className='min-h-screen flex flex-col items-center w-full px-6 py-12 max-w-md bg-white rounded-lg shadow-lg relative z-10'>
            <Brand />
            <div className='mt-6 w-full'>
              <Auth
                providers={[]}
                supabaseClient={supaclient}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#3b82f6', // Primary brand color
                        brandAccent: '#2563eb', // Accent color
                        inputText: '#1f2937', // Darker text for better readability
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
