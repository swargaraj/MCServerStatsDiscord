const fetch = require("node-fetch");

async function pingMC(ip, port, bedrock) {
  const url = bedrock
    ? `https://api.mcsrvstat.us/bedrock/3/${ip}:${port}`
    : `https://api.mcsrvstat.us/3/${ip}:${port}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    log.error("Error fetching server details:", error);
    throw error;
  }
}

module.exports = pingMC;
