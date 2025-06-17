# Discord Admin Bot

A powerful Discord bot with administrative commands for server moderation.

## Features

- Kick members
- Ban members
- Mute members (temporary)
- Clear messages
- Warn members
- Permission management
- Error handling

## Setup Instructions

1. Install Python 3.8 or higher
2. Install required packages:
   ```
   pip install -r requirements.txt
   ```
3. Create a Discord bot and get your token:

- Create a bot and copy the token

4. Create a `.env` file and add your bot token:
DISCORD_TOKEN=ضع_توكن_البوت_هنا
5. Run the bot:
   ```
   python bot.py
   ```

## Commands

- `!kick @user [reason]` - Kick a member
- `!ban @user [reason]` - Ban a member
- `!mute @user duration [reason]` - Mute a member for specified minutes
- `!clear amount` - Clear specified number of messages
- `!warn @user [reason]` - Warn a member

## Permissions

Make sure to give the bot the following permissions when adding it to your server:
- Kick Members
- Ban Members
- Manage Roles
- Manage Messages
- Send Messages
- Embed Links
- Read Message History

## Note

The bot requires appropriate permissions to execute commands. Users using the commands must also have the necessary permissions in the server.

# noob

## طريقة التشغيل على Railway

1. ارفع المشروع إلى GitHub.
2. اربطه مع Railway واختر Deploy from GitHub.
3. أضف متغيرات البيئة (Environment Variables) المطلوبة من إعدادات Railway.
4. Railway سيشغل البوت تلقائيًا باستخدام الأمر:

```
npm start
```

## متطلبات البيئة (env)

- يجب إنشاء ملف `.env` يحتوي على المتغيرات التالية:

```
DISCORD_TOKEN=MTIyNDU5MzM5NTcyNTM2OTM5NA.GC91Ri.exJ45uwVGsyHKgZes1igFfJFL5CuPidNEgyfik
```

---
