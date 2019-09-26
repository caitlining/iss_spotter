const request = require('request');

//this will contain most of the logic for fetching the data from each API endpoint

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 * - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 * - An error, if any (nullable)
 * - the IP address as a string (null if error). Ex; "162.245.144.188"
*/

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const myIPObj = JSON.parse(body);
    const myIP = myIPObj.ip;
    callback(null, myIP);
  });
};

const fetchCoordsByIP = function(ipStr, callback) {
  request(`https://ipvigilante.com/${ipStr}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geographic information. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let geoObj = {};
    const myLocationObj = JSON.parse(body);
    geoObj.latitude = myLocationObj.data.latitude;
    geoObj.longitude = myLocationObj.data.longitude;
    callback(null, geoObj);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };