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

/**
 * Makes a single APR request to retrieve upcoming ISS fly over times for the given lat/lng coordinates
 * Input:
 * - An Object with keys 'latitude' and 'longitude'
 * - A callback (to pass back an error or the ARRAY of the resulting data)
 * Returns (via callback):
 * - An error, if any (nullable)
 * - The fly over times as an array of objects (null if error). Example:
 * [{risetime: 239482, duration: 600}, ...]
 *  */

const fetchISSFlyOverTimes = function(geoObject, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${geoObject.latitude}&lon=${geoObject.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);

  });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };