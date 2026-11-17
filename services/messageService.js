import { supabase } from "../config/supabase.js";
export async function saveMessage(msg) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { error } = await supabase.from("contact_messages").insert(msg);
  if (error) throw error;
}
