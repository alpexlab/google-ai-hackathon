import { createContext, useContext, useState, useEffect } from 'react';
import { supaclient } from '@/services/supabase';
import { _AUTH_CONTEXT } from '@/types';
import FullPageLoader from '@/components/loader/FullPage';
import { Session } from '@supabase/gotrue-js';

const AuthContext = createContext<_AUTH_CONTEXT>({
  email: undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | Session>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const res = await supaclient.auth.getSession();
      setSession(res.data.session);
      setLoading(false);
    }

    getSession();

    const {
      data: { subscription },
    } = supaclient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    email: session?.user.email,
  };

  if (loading) {
    return <FullPageLoader />;
  }

  const provider = <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  return provider;
}
