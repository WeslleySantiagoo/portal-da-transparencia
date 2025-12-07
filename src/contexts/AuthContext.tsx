import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('🔍 Fetching user profile from users table for ID:', userId);
      
      // Buscar usuário usando ID (funciona com RLS)
      console.log('🔎 Executing: SELECT * FROM users WHERE id =', userId);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        console.error('❌ Error fetching user from users table:', userError);
        
        // Buscar o email do usuário autenticado
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser?.email) {
          console.error('❌ No email found for authenticated user');
          setLoading(false);
          return;
        }
        
        console.log('⚠️ User not found in users table. Will create with role PUBLICO');
        
        // Criar usuário na tabela users com role padrão
        const newUser: User = {
          id: authUser.id,
          email: authUser.email,
          role: 'PUBLICO', // Role padrão da NOSSA aplicação
          created_at: new Date().toISOString(),
        };
        
        // Tentar inserir
        const { error: insertError } = await supabase
          .from('users')
          .insert(newUser);
        
        if (insertError) {
          console.error('❌ Error inserting user:', insertError);
        } else {
          console.log('✅ User created successfully with role PUBLICO');
        }
        
        setUser(newUser);
      } else {
        // Sucesso ao buscar os dados do usuário
        console.log('✅ User data fetched from users table:', userData);
        
        const userFromDb: User = {
          id: userData.id,
          email: userData.email,
          role: userData.role as UserRole,
          created_at: userData.created_at
        };
        
        console.log('✅ User profile complete:', {
          email: userFromDb.email,
          role: userFromDb.role,
          source: 'SELECT * FROM users WHERE id'
        });
        
        setUser(userFromDb);
      }
    } catch (error) {
      console.error('💥 Unexpected error in fetchUserProfile:', error);
      
      // Fallback: criar perfil temporário
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const tempUser: User = {
          id: authUser.id,
          email: authUser.email || '',
          role: 'PUBLICO', // Role padrão
          created_at: new Date().toISOString(),
        };
        setUser(tempUser);
        console.log('🔄 Created temporary user profile:', tempUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
    console.log('✅ Sign in successful - Auth ID:', data.user?.id);
    console.log('⏳ Now fetching user role from users table...');
    // O fetchUserProfile será chamado automaticamente pelo onAuthStateChange
    // que vai buscar a role da tabela users
  };

  const signOut = async () => {
    console.log('👋 Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSupabaseUser(null);
    console.log('✅ Signed out successfully');
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) {
      console.log('⚠️ hasRole check: No user logged in');
      return false;
    }
    
    // Usar APENAS a role da tabela users
    const userHasRole = roles.includes(user.role);
    console.log(`🔑 hasRole check: User "${user.email}" has role "${user.role}". Required: [${roles.join(', ')}]. Result: ${userHasRole}`);
    
    return userHasRole;
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, signIn, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
