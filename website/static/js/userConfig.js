import { supabase } from './supabaseClient.js';

// User configuration structure
export class UserConfig {
    constructor(userId) {
        this.userId = userId;
        this.botToken = '';
        this.storageChannel = '';
        this.storageChannelName = '';
        this.isConfigured = false;
    }

    async save() {
        try {
            const { error } = await supabase
                .from('user_configs')
                .upsert({
                    user_id: this.userId,
                    bot_token: this.botToken,
                    storage_channel: this.storageChannel,
                    storage_channel_name: this.storageChannelName,
                    is_configured: this.isConfigured
                });
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error saving user config:', error);
            return false;
        }
    }

    static async load(userId) {
        try {
            const { data, error } = await supabase
                .from('user_configs')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) throw error;
            
            const config = new UserConfig(userId);
            config.botToken = data.bot_token;
            config.storageChannel = data.storage_channel;
            config.storageChannelName = data.storage_channel_name;
            config.isConfigured = data.is_configured;
            
            return config;
        } catch (error) {
            console.error('Error loading user config:', error);
            return new UserConfig(userId);
        }
    }

    static async initializeSystem() {
        try {
            // Create user_configs table if it doesn't exist
            await supabase.rpc('ensure_user_configs_table');
            
            // Create system channel entry
            const { error } = await supabase
                .from('system_config')
                .upsert({
                    key: 'system_channel',
                    value: process.env.SYSTEM_CHANNEL
                });
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error initializing system:', error);
            return false;
        }
    }
}
