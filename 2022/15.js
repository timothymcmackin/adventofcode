// Oh, boy...

const testInputString = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const inputString = `Sensor at x=1384790, y=3850432: closest beacon is at x=2674241, y=4192888
Sensor at x=2825953, y=288046: closest beacon is at x=2154954, y=-342775
Sensor at x=3553843, y=2822363: closest beacon is at x=3444765, y=2347460
Sensor at x=2495377, y=3130491: closest beacon is at x=2761496, y=2831113
Sensor at x=1329263, y=1778185: closest beacon is at x=2729595, y=2000000
Sensor at x=2882039, y=2206085: closest beacon is at x=2729595, y=2000000
Sensor at x=3903141, y=2510440: closest beacon is at x=4006219, y=3011198
Sensor at x=3403454, y=3996578: closest beacon is at x=3754119, y=4475047
Sensor at x=3630476, y=1048796: closest beacon is at x=3444765, y=2347460
Sensor at x=16252, y=2089672: closest beacon is at x=-276514, y=2995794
Sensor at x=428672, y=1150723: closest beacon is at x=-281319, y=668868
Sensor at x=2939101, y=3624676: closest beacon is at x=2674241, y=4192888
Sensor at x=3166958, y=2890076: closest beacon is at x=2761496, y=2831113
Sensor at x=3758241, y=3546895: closest beacon is at x=4006219, y=3011198
Sensor at x=218942, y=3011070: closest beacon is at x=-276514, y=2995794
Sensor at x=52656, y=3484635: closest beacon is at x=-276514, y=2995794
Sensor at x=2057106, y=405314: closest beacon is at x=2154954, y=-342775
Sensor at x=1966905, y=2495701: closest beacon is at x=2761496, y=2831113
Sensor at x=511976, y=2696731: closest beacon is at x=-276514, y=2995794
Sensor at x=3094465, y=2478570: closest beacon is at x=3444765, y=2347460
Sensor at x=806671, y=228252: closest beacon is at x=-281319, y=668868
Sensor at x=3011731, y=1976307: closest beacon is at x=2729595, y=2000000`;

const lineRegex = /Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)$/;
const processInputString = (str) => str.split('\n').map((line) => {
  const result = lineRegex.exec(line);
  const sx = Number(result[1]);
  const sy = Number(result[2]);
  const bx = Number(result[3]);
  const by = Number(result[4]);
  // Get the manhattan distance to the nearest beacon
  return {
    sensor: {
      x: sx,
      y: sy,
    },
    beacon: {
      x: bx,
      y: by,
    },
    distance: Math.abs(sx - bx) + Math.abs(sy - by),
  };
});


// Can I make this work by checking if there are no sensors with a beacon closer than the position?
const getNoBeaconsInLine = (sensorData, y) => {
  // Where to start and stop checking?
  // Could start at -1 and move negative and then start at 0 and move positive
  let noBeacon = 0;

  // To help tell when to start and stop
  const sensorXs = sensorData.map((datum) => datum.sensor.x);
  const maxSensorX = Math.max(...sensorXs);
  const minSensorX = Math.min(...sensorXs);

  // List of all becaons with no duplicates
  const beacons = sensorData.reduce((allBeacons, datum) => {
    if (!allBeacons.some(({ x, y }) => datum.beacon.x === x && datum.beacon.y === y)) {
      return allBeacons.concat({
        x: datum.beacon.x,
        y: datum.beacon.y,
      });
    }
    return allBeacons;
  }, []);

  // Start at minSensorX and move positive
  let foundSpot = true;
  let x = minSensorX;
  // If we're farther right than all sensors, we're out of range and only going to get farther away
  while (foundSpot || x <= maxSensorX) {
    // If there's a beacon here, don't count the spot
    const isBeaconHere = beacons.some((oneBeacon) => x === oneBeacon.x && y === oneBeacon.y);
    if (isBeaconHere) {
      console.log('Skipping beacon at ', x, ',', y);
    }
    if (!isBeaconHere && sensorData.some((datum) => {
      // If any sensor is closer to this location than its distance, there can't be a beacon here
      const manhattanDistanceToSensor = Math.abs(x - datum.sensor.x) + Math.abs(y - datum.sensor.y);
      return manhattanDistanceToSensor <= datum.distance;
    })) {
      foundSpot = true;
      noBeacon++;
      console.log('No beacon at ', x, ',', y, ' got ', noBeacon, 'spots');
    } else {
      foundSpot = false;
      console.log('Could be a beacon at ', x, ',', y);
    }
    x++;
  }

  // Start at minSensorX-1 and move negative
  x = minSensorX - 1;
  foundSpot = true;
  while (foundSpot || x >= minSensorX) {
    const isBeaconHere = beacons.some((oneBeacon) => x === oneBeacon.x && y === oneBeacon.y);
    if (isBeaconHere) {
      console.log('Skipping beacon at ', x, ',', y);
    }
    if (!isBeaconHere && sensorData.some((datum) => {
      // If any sensor is closer to this location than its distance, there can't be a beacon here
      const manhattanDistanceToSensor = Math.abs(x - datum.sensor.x) + Math.abs(y - datum.sensor.y);
      return manhattanDistanceToSensor <= datum.distance;
    })) {
      foundSpot = true;
      noBeacon++;
      console.log('No beacon at ', x, ',', y, ' got ', noBeacon, 'spots');
    } else {
      foundSpot = false;
      console.log('Could be a beacon at ', x, ',', y);
    }
    x--;
  }

  return noBeacon;

}

const testInput = processInputString(testInputString);
const input = processInputString(inputString);

// const noBeaconsTest = getNoBeaconsInLine(testInput, 10);
// console.log(noBeaconsTest, 'should be 26');

// const noBeaconsPart1 = getNoBeaconsInLine(input, 2000000);
// console.log('Part 1:', noBeaconsPart1); // 5256611

// Part 2
// The distress beacon is not detected by any sensor, but the distress beacon must have x and y coordinates each no lower than 0 and no larger than 4000000.
// Got the hint that the beacon's space must be exactly +1 distance from at least two sensors
// Also the strategy of considering the "diamonds" created by range + 1 from each sensor
// So traverse the perimeter of each diamond and check each of those cells?
const findTheBeacon = (sensorData, minToSearch, maxToSearch) => {
  for (const datum of sensorData) {
    const { sensor, distance } = datum;
    let x1 = sensor.x;
    let x2 = sensor.x;
    let y1 = sensor.y - distance - 1;
    let y2 = sensor.y + distance + 1;
    while (y1 <= sensor.y) {
      // Check these coordinates
      if (couldThereBeABeaconHere(sensorData, x1, y1, minToSearch, maxToSearch)) {
        return x1 * 4000000 + y1;
      }
      if (couldThereBeABeaconHere(sensorData, x1, y2, minToSearch, maxToSearch)) {
        return x1 * 4000000 + y2;
      }
      if (couldThereBeABeaconHere(sensorData, x2, y1, minToSearch, maxToSearch)) {
        return x2 * 4000000 + y1;
      }
      if (couldThereBeABeaconHere(sensorData, x2, y2, minToSearch, maxToSearch)) {
        return x2 * 4000000 + y2;
      }
      // Increment
      x1++;
      x2--;
      y1++;
      y2--;
    }
  }

 // To isolate the distress beacon's signal, you need to determine its tuning frequency, which can be found by multiplying its x coordinate by 4000000 and then adding its y coordinate.
 return 0;
}

// Check this coordinate
const couldThereBeABeaconHere = (sensorData, x, y, min, max) => {
  if (x < min || x > max || y < min || y > max) {
    return false;
  }
  // If any sensor is closer to this location than its distance, there can't be a beacon here
  return !sensorData.some((datum) => {
    const manhattanDistanceToSensor = Math.abs(x - datum.sensor.x) + Math.abs(y - datum.sensor.y);
    return manhattanDistanceToSensor <= datum.distance;
  });
};

const testBeaconPart2 = findTheBeacon(testInput, 0, 20);
console.log(testBeaconPart2, 'should be 56000011');

const beaconPart2 = findTheBeacon(input, 0, 4000000);
console.log('Part 2:', beaconPart2);