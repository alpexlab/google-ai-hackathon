import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const { email } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/auth');
    }
    setShow(true);
  }, [email, navigate]);

  return <>{show && children}</>;
};

export default AuthRequired;
