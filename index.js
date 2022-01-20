const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const flyover of passTimes) {
    const date = new Date(flyover.risetime * 1000);
    console.log(`Next pass at ${date} for ${flyover.duration} seconds!`);
  }
});