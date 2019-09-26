//this will require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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

fetchISSFlyOverTimes({latitude:"43.63190",longitude:"-79.37160"}, (error, flyTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked!", flyTimes);
});