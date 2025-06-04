import { getSupabaseClient } from './supabaseClient.js';
import { UserConfig } from './userConfig.js';

// Function to handle email/password sign in
export async function signIn(email, password) {
    try {
        const supabase = await getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        console.log('Signed in:', data.user.email);
        return true;
    } catch (error) {
        console.error('Error signing in:', error);
        return false;
    }
}

// Function to handle email/password sign up
export async function signUp(email, password) {
    try {
        const supabase = await getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        console.log('Signed up:', data.user.email);
        return true;
    } catch (error) {
        console.error('Error signing up:', error);
        return false;
    }
}

// Function to check if user is authenticated and configured
export function isAuthenticated() {
    return new Promise(async (resolve) => {
        const supabase = await getSupabaseClient();
        if (!supabase) {
            console.error('Supabase client not initialized for isAuthenticated check.');
            resolve(false);
            return;
        }
        const session = await supabase.auth.getSession();
        if (session.data.session) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(session.data.session.user));
            
            // Check if user is configured
            const user = getCurrentUser();
            if (user) {
                const config = await UserConfig.load(user.id);
                if (config && config.isConfigured) {
                    localStorage.setItem('userConfig', JSON.stringify(config));
                    resolve(true);
                    return;
                }
            }
            
            // Redirect to configuration page if not configured
            window.location.href = '/configure';
            resolve(false);
        } else {
            resolve(false);
        }
    });
}

// Function to get current user
export function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Function to get current user configuration
export function getCurrentUserConfig() {
    const configStr = localStorage.getItem('userConfig');
    return configStr ? JSON.parse(configStr) : null;
}

// Function to sign out
export async function signOut() {
    try {
        const supabase = await getSupabaseClient();
        if (!supabase) throw new Error('Supabase client not initialized');
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        localStorage.removeItem('user');
        localStorage.removeItem('userConfig');
        return true;
    } catch (error) {
        console.error('Error signing out:', error);
        return false;
    }
}
