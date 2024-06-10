const fetch = require("node-fetch");

async function skinSearch(name) {
  try {
    const response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${name}`
    );
    if (!response.ok) {
      return null;
    }
    try {
      const data = await response.json();
      return data.id;
    } catch {
      return null;
    }
  } catch (error) {
    log.error("Error fetching server details:", error);
    throw error;
  }
}

module.exports = skinSearch;
