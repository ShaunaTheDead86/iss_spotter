const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(nextISSTimesForMyLocation)
  .then(data => {
    for (const flyover of data) {
      const date = new Date(flyover.risetime * 1000);
      console.log(`Next pass at ${date} for ${flyover.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
