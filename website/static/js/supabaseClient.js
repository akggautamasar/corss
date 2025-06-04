// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// Export for use in other files
export { supabase }
