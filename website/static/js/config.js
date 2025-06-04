import { UserConfig } from './userConfig.js';

// Get current user
const user = getCurrentUser();
if (!user) {
    window.location.href = '/';
}

// DOM Elements
const saveButton = document.getElementById('saveConfig');
const statusMessage = document.getElementById('statusMessage');
const botTokenInput = document.getElementById('botToken');
const storageChannelInput = document.getElementById('storageChannel');
const channelNameInput = document.getElementById('channelName');

// Initialize configuration
async function initializeConfig() {
    try {
        const config = await UserConfig.load(user.id);
        if (config && config.isConfigured) {
            botTokenInput.value = config.botToken;
            storageChannelInput.value = config.storageChannel;
            channelNameInput.value = config.storageChannelName;
        }
    } catch (error) {
        console.error('Error initializing config:', error);
        statusMessage.textContent = 'Error loading configuration. Please try again.';
        statusMessage.className = 'status-message error';
    }
}

// Save configuration
async function saveConfiguration() {
    const botToken = botTokenInput.value.trim();
    const storageChannel = storageChannelInput.value.trim();
    const channelName = channelNameInput.value.trim();

    if (!botToken || !storageChannel || !channelName) {
        statusMessage.textContent = 'Please fill in all fields.';
        statusMessage.className = 'status-message error';
        return;
    }

    try {
        const config = new UserConfig(user.id);
        config.botToken = botToken;
        config.storageChannel = storageChannel;
        config.storageChannelName = channelName;
        config.isConfigured = true;

        const success = await config.save();
        if (success) {
            statusMessage.textContent = 'Configuration saved successfully! Redirecting...';
            statusMessage.className = 'status-message success';
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            statusMessage.textContent = 'Error saving configuration. Please try again.';
            statusMessage.className = 'status-message error';
        }
    } catch (error) {
        console.error('Error saving configuration:', error);
        statusMessage.textContent = 'Error saving configuration. Please try again.';
        statusMessage.className = 'status-message error';
    }
}

// Event Listeners
saveButton.addEventListener('click', saveConfiguration);

// Initialize page
initializeConfig();
