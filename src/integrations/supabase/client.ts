// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dmovafpmgdkxblpmopql.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb3ZhZnBtZ2RreGJscG1vcHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NjQwMDMsImV4cCI6MjA1MDM0MDAwM30.ptD7a1326qc-1-kcOFNeEdZvl_ZjwWf5Sm1I3tUBwec";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);