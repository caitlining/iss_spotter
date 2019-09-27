//this will require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP('207.194.49.162', (error, geos) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked!", geos);
// });

// fetchISSFlyOverTimes({latitude:"43.63190",longitude:"-79.37160"}, (error, flyTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked!", flyTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

  // for (const obj of passTimes) {
  //   const startDate = new Date((obj.risetime)* 1000);
  //   const betterDate = startDate.toGMTString() + "-0700 (Pacific Daylight Time)";
  //   const output = `Next pass at ${betterDate} for ${obj.duration} seconds!`;
  //   console.log(output);
  // }


