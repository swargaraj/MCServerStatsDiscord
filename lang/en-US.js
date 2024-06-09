const TEXTS = {
  SERVER_TRACKING: "Server is being added to tracking.",
  SERVER_TRACKED:
    "Server added successfully. The bot will now track the server status. Make sure to keep the current permissions while arranging the voice channels. Stats will update every 5 minutes. You can use `/remove` to remove the channels.",
  ERROR_ADDING_SERVER: "An error occurred while adding the server.",
  SERVER_REMOVING: "Server is being removed from tracking.",
  SERVER_REMOVED: "Server removed successfully.",
  ERROR_REMOVING_SERVER: "An error occurred while removing the server.",
  NO_SERVER_TRACKED: "Please setup a server before pinging",
  NOT_AN_ADMIN: "You need to be an admin to run this command.",
  NO_PERMISSION:
    "Bot does not have the Manage Channel permission. Please grant it to the bot.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  SERVER_OFFLINE: "Server is offline.",
  SERVER_ONLINE: "Server is online.",
};

module.exports = TEXTS;
