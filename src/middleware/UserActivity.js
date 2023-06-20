const axios = require('axios');

// Middleware function to capture and log browser details
const UserActivity = async (req, res, next) => {
  let ip = req.ip;
  const userAgent = req.headers['user-agent'];
  const acceptLanguage = req.headers['accept-language'];
  const referrer = req.headers['referer'] || req.headers['referrer'];

  // Fetch geolocation data based on IP address
  ip = "105.112.182.26"
  const geolocationData = (ip !== "::1")? await fetchGeolocationData(ip) : null;

  // Log the browser details, device info, and country
  const activity = {
    'User-Agent': userAgent,
    'Accept-Language': acceptLanguage,
    'Referrer,': referrer,
    'GeolocationData': geolocationData
  };
  req.activity = activity;
  next();
};

// Function to fetch geolocation data based on IP address using HERE Geolocation API
const fetchGeolocationData = async (ip) => {
  try {
    const IP_REGISTRY_KEY = process.env.IP_REGISTRY_KEY; // Add your IP Registry API key here
    const response = await axios.get(`https://api.ipregistry.co/${ip}?key=${IP_REGISTRY_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
  }
};

module.exports = { UserActivity };
