const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const timesUnparsed = fs.readFileSync(path.resolve(__dirname, './inputs/4.txt'), 'utf8')
  .split('\n');

const parseTime = (str) => {
  const dayString = str.split(' ')[0].split('[')[1];
  const timeString = str.split(' ')[1].split(']')[0];
  const eventString = str.split(']')[1].trim();

  const year = Number(dayString.split('-')[0]);
  const month = Number(dayString.split('-')[1]);
  const day = Number(dayString.split('-')[2]);

  const hour = Number(timeString.split(':')[0]);
  const minute = Number(timeString.split(':')[1]);

  const date = new Date(year, month, day, hour, minute);
  const millis = date.getTime() / 1000;

  let event;
  let guardNumber;
  const guardNumberRegex = /Guard #(\d*) begins shift/;
  if (eventString === 'falls asleep') {
    event = 'sleep';
  } else if (eventString === 'wakes up') {
    event = 'wake';
  } else if (guardNumberRegex.test(eventString)) {
    const result = guardNumberRegex.exec(eventString);
    guardNumber = Number(result[1]);
    event = 'guard';
  } else {
    console.error('Failed to parse string');
    process.exit(1);
  }

  return {
    str,
    date,
    millis,
    event,
    guardNumber,
    year, month, day, hour, minute,
  };
};

const timesUnsorted = timesUnparsed.map(parseTime);
// const times = _.sortBy(timesUnsorted, (t) => t.millis); // no worky; it mis-orders 4/1 and 3/31, seeing them as the same time, not sure why, maybe to do with comparing dates as strings?
var times = JSON.parse(JSON.stringify(timesUnsorted));
times.sort(function compare(a, b) {

  if (a.month !== b.month) {
    return a.month - b.month;
  }
  if (a.day !== b.day) {
    return a.day - b.day;
  }
  if (a.hour !== b.hour) {
    return a.hour - b.hour;
  }
  if (a.minute !== b.minute) {
    return a.minute - b.minute;
  }
  return 0;
});

// fs.writeFileSync(path.resolve(__dirname, './inputs/4-sorted2.txt'), times.toString(), 'utf8');

fs.writeFileSync(path.resolve(__dirname, './inputs/4-sorted.txt'), 
  times.map(({
    date, millis,
    event,
    guardNumber,
    year, month, day, hour, minute,
  }) => {
    let result = `${year}-${month}-${day}: ${hour}:${minute}`;
    if (event === 'guard') {
      result += ` guard ${guardNumber} starts shift`;
    }
    if (event === 'sleep') {
      result += ` guard goes to sleep`;
    }
    if (event === 'wake') {
      result += ` guard wakes up`;
    }
    return result + ' ' + millis;
    }).join('\n')
, 'utf8');

let guardTimes = {};

let activeGuard;
let guardAwake = true;
let counter = -1;
while (times.length > 0) {
  let currentTime = times.shift(); counter++;
  activeGuard = currentTime.guardNumber;
  if (!guardTimes[activeGuard]) {
    guardTimes[activeGuard] = {
      total: 0,
      intervals: [],
    };
  }
  // Guard starts shift awake
  // Might start shift before the midnight hour, so default to 0
  let wokeUpAt = currentTime.hour === 0 ? currentTime.minute : 0;
  let wentToSleepAt = undefined;

  // console.log('New guard: ', activeGuard);

  let sameGuard = true;
  while (sameGuard && times.length > 0) {
    // Look ahead to next event
    const lookaheadTime = times[0];
    if (lookaheadTime.event === 'guard') {
      // If the guard is asleep, they slept through the end of the shift
      if (!guardAwake && !!wentToSleepAt) {
        guardTimes[activeGuard].total += 60 - wentToSleepAt;
        guardTimes[activeGuard].intervals.push([wentToSleepAt, 60]);
        console.log('Guard slept through end of the hour, total sleep', 60 - wentToSleepAt);
      }
      // It's another guard
      sameGuard = false;
    } else if (guardAwake && lookaheadTime.event === 'sleep') {
      // console.log('Guard goes to sleep at ', lookaheadTime.hour, ":", lookaheadTime.minute);
      // guard goes to sleep
      currentTime = times.shift();counter++
      wentToSleepAt = currentTime.minute;
      guardAwake = false;
    } else if (!guardAwake && lookaheadTime.event === 'wake') {
      // Guard wakes up
      currentTime = times.shift();counter++;
      wokeUpAt = currentTime.minute;
      // console.log('Guard wakes up at ', currentTime.hour, ":", currentTime.minute, 'total sleep', wokeUpAt - wentToSleepAt);
      guardAwake = true;
      // Record how long the guard was asleep
      guardTimes[activeGuard].total += wokeUpAt - wentToSleepAt;
      guardTimes[activeGuard].intervals.push([wentToSleepAt, wokeUpAt]);
    } else if (lookaheadTime.event === 'guard') {
      // New guard
      // If this guard is sleeping, they slept through the end of the shift
      if (!guardAwake) {
        guardTimes[activeGuard].total += 60 - wentToSleepAt;
        guardTimes[activeGuard].intervals.push([wentToSleepAt, 60]);
      }
    } else {
      console.log('Got unexpected start/sleep cycle at counter', counter);
      process.exit(1);
    }

  }

}

// console.log(guardTimes);

// Get guard that slept the most on a single minute (part 1)
// const maxSleep = _.reduce(guardTimes, (highestSleepSoFar, oneSleep) =>
//   oneSleep.total > highestSleepSoFar.total ? oneSleep : highestSleepSoFar
// );
// const maxSleepGuardNo = Number(Object.keys(guardTimes)
//   .find((oneKey) => guardTimes[oneKey].total === maxSleep.total));

// Find the minutes that the guard was asleep
// const minutesAsleep = maxSleep.intervals.reduce((minutes, interval) => {
//   const fallAsleep = interval[0];
//   const wakeUp = interval[1];
//   for (let i = fallAsleep; i < wakeUp; i++) {
//     if (!minutes[i]) {
//       minutes[i] = 0;
//     }
//     minutes[i]++;
//   }
//   return minutes;
// }, {});

// console.log(minutesAsleep);
// const mostMinuteAmount = _.reduce(minutesAsleep, (highestMinuteSoFar, oneMinute) => Math.max(highestMinuteSoFar, oneMinute));
// const mostSleepyMinute = Number(Object.keys(minutesAsleep).find((oneKey) => minutesAsleep[oneKey] === mostMinuteAmount));
// console.log('Most sleepy minute: ', mostSleepyMinute, 'amount:', mostMinuteAmount );
// console.log('guard ID', maxSleepGuardNo);
// console.log('product: ', mostSleepyMinute * maxSleepGuardNo);

const getMinutesAsleep = (intervals) => intervals.reduce((minutes, interval) => {
  const fallAsleep = interval[0];
  const wakeUp = interval[1];
  for (let i = fallAsleep; i < wakeUp; i++) {
    if (!minutes[i]) {
      minutes[i] = 0;
    }
    minutes[i]++;
  }
  return minutes;
}, {});

guardTimes = _.map(guardTimes, ({ intervals, total }, guardId) => {
  const minutesAsleep = getMinutesAsleep(intervals);
  const mostMinuteAmount = _.reduce(minutesAsleep, (highestMinuteSoFar, oneMinute) => Math.max(highestMinuteSoFar, oneMinute));
  const mostSleepyMinute = Number(Object.keys(minutesAsleep).find((oneKey) => minutesAsleep[oneKey] === mostMinuteAmount));
  return {
    guardId: Number(guardId),
    intervals,
    total,
    mostMinuteAmount,
    mostSleepyMinute,
  };
});

const guardWithHighestSleepyMinute = guardTimes.reduce((topGuard, currentGuard) => 
  currentGuard.mostMinuteAmount > topGuard.mostMinuteAmount ? currentGuard : topGuard
);

console.log(guardWithHighestSleepyMinute.guardId * guardWithHighestSleepyMinute.mostSleepyMinute);