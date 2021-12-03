const fs = require('fs');

input = fs.readFileSync('./d3.input', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(' '))
  .flatMap(i => i)
  .filter(i => i)


const bitLength = input[0].length
console.log(bitLength)

const calcCounts = data => {
  let counts = [];

  data.forEach(row => {
    row.split('').forEach((char, i) => {
      if (!counts[i]) {
        counts[i] = { zero: 0, one: 0 };
      }

      if (char === '0') {
        counts[i].zero += 1;
      }

      if (char === '1') {
        counts[i].one += 1;
      }
    });
  });

  return counts;
}

let oxygen = '';
let scrubber = '';

let mostCommonState = [ ...input ];
let leastCommonState = [ ...input ];


for (let i = 0; i < bitLength; i++) {
  if (oxygen == '') {
    const mostCommonCounts = calcCounts(mostCommonState);
    let item = mostCommonCounts[i];
    let filteredMostCommon = mostCommonState.filter(row => {
      if (item.zero > item.one && row[i] == '0') {
        return true
      }

      if (item.one >= item.zero && row[i] == '1') {
        return true
      }

      return false;
    })

    if (filteredMostCommon.length === 1) {
      oxygen = filteredMostCommon[0];
    }

    mostCommonState = [ ...filteredMostCommon ]
  }

  if (scrubber == '') {
    const leastCommonCounts = calcCounts(leastCommonState);
    let item = leastCommonCounts[i];

    let filteredLeastCommon = leastCommonState.filter(row => {
      if (item.zero <= item.one && row[i] === '0') {
        return true
      }

      if (item.one < item.zero && row[i] === '1') {
        return true
      }

      return false;
    })

    if (filteredLeastCommon.length === 1) {
      scrubber = filteredLeastCommon[0];
    }

    console.log(filteredLeastCommon)
    leastCommonState = [ ...filteredLeastCommon ]
  }

  if (scrubber != '' && oxygen != '') {
    break
  }
}

const scrubberNum = parseInt(scrubber, 2);
const oxygenNum = parseInt(oxygen, 2);

console.log(scrubberNum * oxygenNum)
