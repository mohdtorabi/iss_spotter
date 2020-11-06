const { nextISSTimesForMyLocation } = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP("70.79.182.221" , (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , data);

}); 


const exampleCoords = { lat: 49.2372, lon: -123.037 };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});*/

const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass will be at ${dateTime} for duration of ${duration} seconds!!!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  //console.log(passTimes);
  printPassTimes(passTimes);
});