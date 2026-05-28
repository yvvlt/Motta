import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://trngiojshwbfachllhjs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybmdpb2pzaHdiZmFjaGxsaGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkzMTgsImV4cCI6MjA5NTUwNTMxOH0.jImpxN2Sm8gHSd_180Dt56GfgbS3TVV6ezgnNKybjlo";

export const supabase = createClient(supabaseUrl, supabaseKey);
