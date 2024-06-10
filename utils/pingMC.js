const fetch = require("node-fetch");

async function pingMC(ip, port, bedrock) {
  const url = bedrock
    ? `https://api.mcstatus.io/v2/status/bedrock/${ip}:${port}`
    : `https://api.mcstatus.io/v2/status/java/${ip}:${port}`;

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
