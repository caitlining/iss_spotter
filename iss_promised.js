const request = require('request-promise-native');

/**
 * Requests user's ip address from url
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).lat
  const longitude = JSON.parse(body).lon
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
}

module.exports = { nextISSTimesForMyLocation };
