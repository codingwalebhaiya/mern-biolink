// services/bloomFilterService.js
import BloomFilter from "bloom-filters";
import Redis from "ioredis";

const redis = new Redis();
const usernameFilter = new BloomFilter(1000000, 0.01); // 1M items, 1% false positive rate

// Load filter from Redis on startup
async function loadFilter() {
  const savedFilter = await redis.get("usernameBloomFilter");
  if (savedFilter) {
    usernameFilter.fromJSON(JSON.parse(savedFilter));
  }
}

// Save filter to Redis periodically or on exit
async function saveFilter() {
  const serializedFilter = JSON.stringify(usernameFilter.saveAsJSON());
  await redis.set("usernameBloomFilter", serializedFilter);
}

// Add username to filter
function addUsername(username) {
  usernameFilter.add(username);
}

// Check if username might exist
function mightContain(username) {
  return usernameFilter.has(username);
}

export { loadFilter, saveFilter, addUsername, mightContain };
 