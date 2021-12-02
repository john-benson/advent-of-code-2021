
const fs = require('fs');

const json_string = fs.readFileSync('./d1_input.json');
const data = JSON.parse(json_string);

windows = [
  []
]

for (entry of data) {
  current_window = windows.at(-1)
  len_current_window = current_window.length

  if (len_current_window < 3) {
    current_window.push(entry)
  }
  else if (len_current_window == 3) {
    next_window = [entry, current_window[0], current_window[1]]
    windows.push(next_window)
  }
}

console.log(windows)

window_sums = windows
  .filter(item => item.length == 3)
  .map(item => item.reduce((val, acc) => acc + val, 0))

let increases = 0;
let current = null;

for (value of window_sums) {

  if (current == null) {
    current = value
  }
  else if (value > current) {
    increases = increases + 1
  }

  current = value
}

console.log(increases)
