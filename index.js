const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const flyover of passTimes) {
    console.log(`Next pass at ${Date(flyover.risetime)} for ${flyover.duration} seconds!`);
  }
});