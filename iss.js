const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request("https://api.ipify.org/?format=json", (error,response, body) => {
    
    
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //console.log(body);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { lat, lon } = JSON.parse(body);

    callback(null, { lat, lon });
  });
};


const fetchISSFlyOverTimes = function(cords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${cords.lat}&lon=${cords.lon}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, passTime) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, passTime);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };