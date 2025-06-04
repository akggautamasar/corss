from dotenv import load_dotenv
import os

# Load environment variables from the .env file, if present
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# System configuration for user setup
SYSTEM_BOT_TOKEN = os.getenv("SYSTEM_BOT_TOKEN")  # Main bot token for user setup
MAIN_BOT_TOKEN = SYSTEM_BOT_TOKEN  # Alias for bot_mode.py compatibility
SYSTEM_CHANNEL = int(os.getenv("SYSTEM_CHANNEL", "0"))  # System channel ID (optional)
SYSTEM_CHANNEL_MSG_ID = int(os.getenv("SYSTEM_CHANNEL_MSG_ID", "0"))  # System message ID (optional)

# Telegram admin user IDs (comma-separated in env, e.g. '12345,67890')
TELEGRAM_ADMIN_IDS = [int(x) for x in os.getenv("TELEGRAM_ADMIN_IDS", "").split(",") if x.strip().isdigit()]

# Website configuration
WEBSITE_URL = os.getenv("WEBSITE_URL", "https://atomic-selene-airlazy-3b04c42d.koyeb.app")

# Telegram API credentials (only needed for system bot)
API_ID = int(os.getenv("API_ID", "0"))  # Default to 0 if not set
API_HASH = os.getenv("API_HASH", "")  # Default to empty if not set

# File handling configuration
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "209715200"))  # Default: 200MB
MAX_SIMULTANEOUS_DOWNLOADS = int(os.getenv("MAX_SIMULTANEOUS_DOWNLOADS", "3"))

# Optional configuration
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin")  # Default to "admin" if not set

# Validate required configurations
required_configs = [
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SYSTEM_BOT_TOKEN",
    "WEBSITE_URL"
]

for config in required_configs:
    if not os.getenv(config):
        raise ValueError(f"Missing required configuration: {config}")

# Optional configurations with defaults
STORAGE_CHANNEL = int(os.getenv("STORAGE_CHANNEL", "0"))  # Optional, used for system files
DATABASE_BACKUP_MSG_ID = int(os.getenv("DATABASE_BACKUP_MSG_ID", "0"))  # Optional, used for system backups

# Print configuration summary (for debugging)
def print_config():
    print("\n=== Configuration Summary ===")
    print(f"Website URL: {WEBSITE_URL}")
    print(f"Max File Size: {MAX_FILE_SIZE/1024/1024:.1f}MB")
    print(f"Max Simultaneous Downloads: {MAX_SIMULTANEOUS_DOWNLOADS}")
    print("============================\n")

print_config()

# Time delay in seconds before retrying after a Telegram API floodwait error
SLEEP_THRESHOLD = int(os.getenv("SLEEP_THRESHOLD", 60))  # Default to 60 seconds

# Admin configuration
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin")  # Default to "admin" if not set
