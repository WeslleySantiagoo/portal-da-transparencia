import { useAuth } from '../contexts/AuthContext';

export const DebugUserInfo = () => {
  
  
  const { user, supabaseUser, loading } = useAuth();
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md text-xs font-mono z-50">
      <div className="font-bold text-yellow-400 mb-2">🐛 DEBUG - User Info</div>
      
      <div className="mb-2">
        <div className="text-gray-400">Loading:</div>
        <div className="text-green-400">{loading ? 'true' : 'false'}</div>
      </div>

      <div className="mb-2">
        <div className="text-gray-400">Supabase User ID:</div>
        <div className="text-blue-400 break-all">{supabaseUser?.id || 'null'}</div>
      </div>

      <div className="mb-2">
        <div className="text-gray-400">Supabase Email:</div>
        <div className="text-blue-400">{supabaseUser?.email || 'null'}</div>
      </div>

      <div className="mb-2">
        <div className="text-gray-400">User from DB:</div>
        {user ? (
          <div className="bg-gray-800 p-2 rounded mt-1">
            <div><span className="text-purple-400">ID:</span> {user.id}</div>
            <div><span className="text-purple-400">Email:</span> {user.email}</div>
            <div><span className="text-yellow-300">Role:</span> <span className="font-bold text-lg">{"aaaaaaaaaaa"}</span></div>
            <div><span className="text-purple-400">Created:</span> {new Date(user.created_at).toLocaleString('pt-BR')}</div>
          </div>
        ) : (
          <div className="text-red-400">null</div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700 text-yellow-300">
        💡 Se a role não estiver correta, execute o SQL no Supabase!
      </div>
    </div>
  );
};
