const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(data) {
  const ip = JSON.parse(data).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=18f68be0-7a3a-11ec-9a1e-212ea0096e7b`);
};

const fetchISSFlyOverTimes = function(data) {
  const {latitude, longitude} = JSON.parse(data);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function(data) {
  const flyovers = JSON.parse(data);
  return flyovers.response;
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};