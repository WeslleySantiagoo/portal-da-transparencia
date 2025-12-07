import { supabase } from "../supabaseClient";

export default async function GetRole(email: string) {
    const { data, error: selectError } = await supabase
    .from('users')
    .select('role')
    .eq('email', email)
    .single();
    if (selectError) {
      console.error('❌ Error fetching user role from users table:', selectError);
      return null;
    }
    if (data) {
      return data.role;
    }

  return null;
}