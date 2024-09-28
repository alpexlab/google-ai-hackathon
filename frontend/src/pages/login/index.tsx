import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supaclient } from '@/services/supabase';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Brand from '@/components/brand';

export default function Login() {
  const { email } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (email) {
      navigate('/');
    }
    setShow(true);
  }, [email, navigate]);

  return (
    <>
      {show && (
        <div className='flex flex-col items-center mt-10'>
          <Brand />
          <div className='mt-3 w-1/3'>
            <Auth providers={[]} supabaseClient={supaclient} appearance={{ theme: ThemeSupa }} />
          </div>
        </div>
      )}
    </>
  );
}
