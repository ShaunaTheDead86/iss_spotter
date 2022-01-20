const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip,callback) {
  request('https://api.freegeoip.app/json/8.8.8.8?apikey=18f68be0-7a3a-11ec-9a1e-212ea0096e7b', (error,response,data) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when feching IP coordinates: ${data}`));
      return;
    }
    
    const coords = {
      latitude: JSON.parse(data).latitude,
      longitude: JSON.parse(data).longitude
    };
    callback(null,coords);
  });
};

const fetchISSFlyOverTimes = function({latitude,longitude},callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error,response,data) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when feching IP coordinates: ${data}`));
      return;
    }

    const flyoversData = JSON.parse(data);
    
    callback(null,flyoversData.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  const IP = fetchMyIP((error,ip) => {
    if (error) {
      console.log(error);
      return;
    }

    const coordinates = fetchCoordsByIP(ip, (error,coords) => {
      if (error) {
        console.log(error);
        return;
      }
      
      const flyovers = fetchISSFlyOverTimes({ latitude: coords.latitude, longitude: coords.longitude }, (error, flyovers) => {
        if (error) {
          console.log(error);
          return;
        }
        
        callback(null,flyovers);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
