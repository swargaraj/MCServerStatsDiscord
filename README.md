_Note: This project is still in its alpha stage, and some features may not work as expected. Please be patient as we work on improving and adding new functionalities._

![minecraft gif stolen from pinterest](https://i.pinimg.com/originals/2d/a1/cf/2da1cfd9dfd56972fc84c73983993713.gif)
# 👾 [Alpha] Minecraft Server Status Discord Bot
Get information of your Minecraft server directly in your Discord server.

## Features
- Displays server status and player count in Discord voice channels, updating every 5 minutes.
- Provides Minecraft server information including using the [MCSrvStat API](https://api.mcsrvstat.us).
- Multi-lingual Support with auto-detection to provide responses in their language.

## Commands
- ```/setup``` Setup the voice channels for displaying server info.
- ```/remove``` Remove the voice channels that display server info.
- ```/ping``` Ping a specific Minecraft server to get its information.
- ```/status``` Ping the guild's default Minecraft server to get its status.

## Installation
1. Ensure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed on your machine.
2. Clone the Repository

   ```
   git clone https://github.com/swargaraj/MCServerStatsDiscord
    ```
3. Navigate to the cloned repository

    ```
    cd MCServerStatsDiscord
    ```
4. Copy the example configuration file and edit it with your details:

   ```
   cp config-example.json config.json
   ```
   Update ```config.json``` with your Discord bot's Client Id, Token, and your MongoDB URI.
5. Install the Dependencies

   ```
   npm install
   ```
6. Start the Bot:

    ```
    npm run start
    ```
## Required Permissions
Make sure the bot has the following permissions:

- ```application.commands```: To create and manage application commands.
- ```manage_channels```: To create and remove voice channels for displaying server info.

## Feedback and Support
We highly value your feedback to improve our service. Please report any issues on the [GitHub Issues page](https://github.com/swargaraj/MCServerStatsDiscord/issues) or join my [Discord Server](https://discord.gg/jhwvHUzKWt) for fast assistance.

## Contributing
We welcome contributions! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
