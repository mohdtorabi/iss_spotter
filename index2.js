const { nextISSTimesForMyLocation} = require('./iss_promised');


const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass will be at ${dateTime} for duration of ${duration} seconds!!!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });