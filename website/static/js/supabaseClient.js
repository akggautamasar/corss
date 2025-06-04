let supabaseClient = null;

async function initializeSupabase() {
    if (supabaseClient) {
        return supabaseClient;
    }

    try {
        const response = await fetch('/api/supabase-config');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();

        if (!config.supabase_url || !config.supabase_anon_key) {
            console.error('Supabase URL or Anon Key is missing from config');
            throw new Error('Supabase URL or Anon Key is missing.');
        }

        // Ensure supabase.createClient is available (it's usually available globally if the Supabase SDK script is loaded)
        if (typeof supabase === 'undefined' || typeof supabase.createClient !== 'function') {
            console.error('Supabase SDK not loaded or createClient is not a function.');
            throw new Error('Supabase SDK not loaded.');
        }
        
        supabaseClient = supabase.createClient(config.supabase_url, config.supabase_anon_key);
        console.log('Supabase client initialized.');
        return supabaseClient;
    } catch (error) {
        console.error('Failed to initialize Supabase client:', error);
        // Optionally, display a user-friendly message on the UI
        return null; // Or handle the error more gracefully
    }
}

// Export a function that returns a promise resolving to the client
// This ensures that other modules wait for initialization
async function getSupabaseClient() {
    if (!supabaseClient) {
        return await initializeSupabase();
    }
    return supabaseClient;
}

export { getSupabaseClient };
