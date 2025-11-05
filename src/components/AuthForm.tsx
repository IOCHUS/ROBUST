import { useAuth } from '../context/AuthContext'; // Adjust path
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export function AuthForm() {
  const { session, supabase } = useAuth();

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']} // Optional: Add OAuth
      />
    );
  } else {
    return (
      <div>
        Logged in as {session.user.email}
        <button onClick={() => supabase.auth.signOut()}>Logout</button>
      </div>
    );
  }
}