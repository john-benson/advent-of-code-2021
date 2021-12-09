const fs = require('fs');

const input = fs
    .readFileSync('./d8.input', 'utf-8')
    .split(/\r?\n/)
    .map(i => i.split(' | '))
    .filter(i => i.length > 1);


const convert = (current, previous) => {
  current = current.split('');

  if (current.length === 2) {
    return { one: current };
  }

  if (current.length === 4) {
    return { four: current };
  }

  if (current.length === 3) {
    return { seven: current }
  }

  if (current.length === 7) {
    return { eight: current }
    //return '8';
  }

  if (current.length === 5) {
    //return { three: current, two: current, five: current }
    //return '?'
  }

  if (current.length === 6) {
    //return { zero: current, six: current, nine: current }
    //return '?'
  }

  return {}
}

const generateMappings = (signals) => {
  const signalParts = signals.split(' ');

  const known = signalParts
    .map(convert)
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})

  const rightPossibilities = known.one;

  const top = known.seven.filter(i => !known.one.includes(i))[0];
  const middleAndTopLeft = known.four.filter(i => !known.one.includes(i));
  const bottomLeftPossibilities = known.eight.filter(i => !known.four.includes(i) && !top == i)
  const bottomPossibilities = [ ...bottomLeftPossibilities ]

  const sixSegment = signalParts.filter(i => i.length === 6);
  const fiveSegment = signalParts.filter(i => i.length === 5);

  // find the entry in Zero Six Nine that doesn't have both right options
  const six = sixSegment
    .filter(signal => !rightPossibilities.every(i => signal.split('').includes(i)));

  known.six = six.map(i => i.split('')).flatMap(i => i)

  const bottom =
    sixSegment
      .filter(i => i != six)
      .map(i => i.split('').sort().join(''))
      .map(i => i.split('').filter(letter => !known.four.includes(letter) && top != letter))
      .filter(i => i.length === 1)
      .flatMap(i => i)[0]

  const topRight = rightPossibilities.filter(opt => !known.six.includes(opt))[0]
  const bottomRight = rightPossibilities.filter(opt => known.six.includes(opt))[0]

  const middle = fiveSegment
    .map(signal =>
      signal.split('').filter(i => ![ topRight, bottomRight, top, bottom ].includes(i))
    )
    .filter(i => i.length === 1)
    .flatMap(i => i)[0]

  const topLeft = middleAndTopLeft.filter(i => ![topRight, bottomRight, top, middle, bottom].includes(i))[0]

  const bottomLeft = ['a','b','c','d','e','f','g'].filter(i => ![topRight, bottomRight, top, middle, bottom, topLeft].includes(i))[0]

  return {
    1: known.one.sort(),
    2: [top, topRight, middle, bottomLeft, bottom].sort(),
    3: [top, topRight, middle, bottomRight, bottom].sort(),
    4: known.four.sort(),
    5: [ top, topLeft, middle, bottomRight, bottom ].sort(),
    6: known.six.sort(),
    7: known.seven.sort(),
    8: known.eight.sort(),
    9: [top, topLeft, topRight, middle, bottom, bottomRight].sort(),
    0: [top, bottom, topLeft, topRight, bottomLeft, bottomRight].sort()
  }
}

const convertSignal = ([ signals, outputs ]) => {
  const mappings = generateMappings(signals);

  console.log(mappings);

  console.log(outputs)
  return outputs.split(' ').map(output => {
    const outputKeys = output.split('');

    const result = Object.entries(mappings).filter(
      ([ number, mapping ]) => mapping.length == outputKeys.length && mapping.every(i => output.includes(i))
    )[0][0]
    console.log(result);

    return result;
  }).join('')

}

console.log(
input.map(convertSignal).map(Number).reduce((acc, cur) => acc + cur, 0)
)

//console.log(input.map(convertSignal));

//console.log(input.map(i => i[1].split(' ')).flatMap(i => i).reduce((acc, cur) => ({
//  ...acc,
//  [outputToNumber(cur)]: acc[outputToNumber(cur)] + 1
//}), { '1': 0, '4': 0, '7': 0, '8': 0, 'other': 0 }))
