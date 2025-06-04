# QuantXcloud - A Google Drive Clone with Telegram Storage

Welcome to QuantXcloud! This web application replicates Google Drive's functionalities using Telegram as its storage backend. Manage folders and files, perform actions like uploading, renaming, and deleting, utilize trash/bin support, enable permanent deletion, and share public links. The application offers admin login and automatically backs up the database to Telegram.

**Check out the [QuantXcloud Personal](https://github.com/TechShreyash/QuantXcloudPersonal) project for local desktop backup support.**

## Features

- **Personal Cloud Storage:** Each user gets their own private cloud storage space
- **Bot Integration:** Connect your own Telegram bot or use our shared bot
- **Custom Storage Channels:** Set up your own Telegram storage channel
- **File Management:** Upload, rename, and delete files with integrated trash/bin functionality
- **Folder Management:** Create, rename, and delete folders
- **Private File Access:** Only see your own files and folders
- **Bot Uploads:** Upload files directly to your storage using Telegram bot
- **URL Upload Support:** Upload files directly from any download link
- **Auto Pinger:** Built-in feature to keep the website active
- **Large File Support:** Support for large files using Telegram Premium accounts
- **Secure Authentication:** Protected with Supabase authentication
- **Bot Mode:** Upload files directly to your personal cloud space using bot mode

## Tech Stack

- **Backend:** Python, FastAPI
- **Frontend:** HTML, CSS, JavaScript
- **Database:** Local storage as a class object, saved to a file using the pickle module.
- **Storage:** Telegram

### Environment Variables

#### Required Variables

| Variable Name            | Type    | Example                   | Description                                                          |
| ------------------------ | ------- | ------------------------- | -------------------------------------------------------------------- |
| `API_ID`                 | integer | 123456                    | Your Telegram API ID                                                 |
| `API_HASH`               | string  | dagsjdhgjfsahgjfh         | Your Telegram API Hash                                               |
| `MAIN_BOT_TOKEN`         | string  | 21413535:gkdshajfhjfakhjf | Main bot token for new user setup                                    |
| `SYSTEM_CHANNEL`         | integer | -100123456789             | System channel for user configurations                               |
| `SYSTEM_CHANNEL_MSG_ID`  | integer | 123                       | Message ID in system channel for user data                           |

> Note: All bots mentioned in the `BOT_TOKENS` variable must be added as admins in your `STORAGE_CHANNEL`.

> Note: `DATABASE_BACKUP_MSG_ID` should be the message ID of a file (document) in the `STORAGE_CHANNEL`.

#### Optional Variables

| Variable Name          | Type                 | Default                                    | Description                                                                                                 |
| ---------------------- | -------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `ADMIN_PASSWORD`       | string               | admin                                      | Password for accessing the admin panel                                                                      |
| `STRING_SESSIONS`      | string               | None                                       | List of Premium Telegram Account Pyrogram String Sessions for file operations                               |
| `SLEEP_THRESHOLD`      | integer (in seconds) | 60                                         | Delay in seconds before retrying after a Telegram API floodwait error                                       |
| `DATABASE_BACKUP_TIME` | integer (in seconds) | 60                                         | Interval in seconds for database backups to the storage channel                                             |
| `MAX_FILE_SIZE`        | float (in GBs)       | 1.98 (3.98 if `STRING_SESSIONS` are added) | Maximum file size (in GBs) allowed for uploading to Telegram                                                |
| `WEBSITE_URL`          | string               | None                                       | Website URL (with https/http) to auto-ping to keep the website active                                       |
| `MAIN_BOT_TOKEN`       | string               | None                                       | Your Main Bot Token to use [QuantXcloud's Bot Mode](#quantxclouds-bot-mode)                                 |
| `TELEGRAM_ADMIN_IDS`   | string               | None                                       | List of Telegram User IDs of admins who can access the [bot mode](#quantxclouds-bot-mode), separated by commas |

> Note: Premium Client (`STRING_SESSIONS`) will be used only to upload files when file size is greater than 2GB.

> Note: File streaming/downloads will be handled by bots (`BOT_TOKENS`).

> Note: Read more about TG Drive's Bot Mode [here](#tg-drives-bot-mode).

## Deploying Your Own TG Drive Application

### 1. Clone the Repository

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/TechShreyash/TGDrive
cd TGDrive
```

### 2. Set Up Your Environment Variables

Create a `.env` file in the root directory and add the necessary [environment variables](#environment-variables).

> **Note:** Some hosting services allow you to set environment variables directly through their interface, which may eliminate the need for a `.env` file.

### 3. Running TG Drive

#### Deploying Locally

1. Install the required Python packages:

   ```bash
   pip install -U -r requirements.txt
   ```

2. Start the TG Drive application using Uvicorn:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

#### Deploying Using Docker

1. Build the Docker image:

   ```bash
   docker build -t tgdrive .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 8000:8000 tgdrive
   ```

Access the application at `http://127.0.0.1:8000` or `http://your_ip:8000`.

> **Note:** For more detailed information on deploying FastAPI applications, refer to online guides and resources.

## Deploy Tutorials

**Deploy To Render.com For Free :** https://youtu.be/S5OIi5Ur3c0

<div align="center">

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/TechShreyash/TGDrive)

</div>

> **Note:** After updating the QuantXcloud code, clear your browser's cache to ensure the latest JavaScript files are loaded and run correctly.

## QuantXcloud's Bot Mode

QuantXcloud's Bot Mode is a powerful feature that allows you to seamlessly integrate your Telegram bot with your cloud storage. By sending or forwarding files to your QuantXcloud bot, you can effortlessly upload them to your cloud storage. You can also specify the folder where you want the files to be uploaded.

To enable this feature, you need to configure the `MAIN_BOT_TOKEN` and `TELEGRAM_ADMIN_IDS` variables. More details about these settings can be found in the [optional variables section](#optional-variables).

Once configured, users with IDs listed in `TELEGRAM_ADMIN_IDS` will have access to the bot.

### Bot Commands

- `/set_folder` - Set the folder for file uploads
- `/current_folder` - Check the current folder

### Quick Demo

Bot Mode - Youtube Video Tutorial : https://youtu.be/XSeY2XcHdGI

#### Uploading Files

1. Open your main bot in Telegram.
2. Send or forward a file to this bot, and it will be uploaded to your QuantXcloud storage. By default, the file will be uploaded to the root folder (home page).

#### Uploading Files

1. Open your main bot in Telegram.
2. Send or forward a file to this bot, and it will be uploaded. By default, the file will be uploaded to the root folder (home page).

#### Changing Folder for Uploading

1. Send the `/set_folder` command and follow the instructions provided by the bot.

## Important Posts Regarding TG Drive

Stay informed by joining our updates channel on Telegram: [@TechZBots](https://telegram.me/TechZBots). We post updates, guides, and tips about TG Drive there.

- https://telegram.me/TechZBots/891
- https://telegram.me/TechZBots/876
- https://telegram.me/TechZBots/874
- https://telegram.me/TechZBots/870

## Contributing

Contributions are welcome! Fork the repository, make your changes, and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For inquiries or support, please email [support@quantxcloud.com](mailto:support@quantxcloud.com).
