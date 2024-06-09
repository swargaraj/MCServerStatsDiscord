module.exports = function ifRateLimited(userId, cooldowns) {
  const now = Date.now();
  if (!cooldowns.has(userId)) {
    // If the user is not in the cooldowns collection, add them with the current timestamp.
    cooldowns.set(userId, now);
    return false; // Not rate limited.
  }

  const userCooldown = cooldowns.get(userId);
  const cooldownDuration = 3000; // 3 seconds in milliseconds.

  if (now - userCooldown < cooldownDuration) {
    // If the time elapsed since the last interaction is less than the cooldown duration.
    return true; // Rate limited.
  } else {
    // If the user's cooldown has expired, update their timestamp to the current time.
    cooldowns.set(userId, now);
    return false; // Not rate limited.
  }
};
