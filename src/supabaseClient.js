import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttputjjbsmeffbruretr.supabase.co";
const supabaseKey = "sb_publishable_9PN8K7qrd0Pn5I3KqVvABQ_zIThIjYT";

export const supabase = createClient(supabaseUrl, supabaseKey);

