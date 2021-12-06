const fs = require('fs');

const input = fs.readFileSync('./d5.input', 'utf-8')
  .split(/\r?\n/)
  .map(coordinates => coordinates.split('->').map(group => group.trim().split(",").map(Number)))

const getVentLocations = ([[ x1, y1 ], [ x2, y2 ]]) => {
    const result = [];

    if (x1 == x2 && y1 != y2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        //console.log(`Veritcal change from ${start} -> ${end}`)
        for (let v = start; v <= end; v++) {
            //console.log(`Recording ${x1}, ${v}`)
            result.push([x1, v])
        }
    }

    if (y1 == y2 && x1 != x2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        //console.log(`Horizontal change from ${start} -> ${end}`)
        for (let h = start; h <= end; h++) {
            //console.log(`Recording ${h}, ${y1}`)
            result.push([h, y1])
        }
    }

    if (x1 != x2 && y1 != y2) {
        //console.log(`Diagonal change from ${x1}, ${y1} -> ${x2}, ${y2}`);

        const horizontalDirection = x2 > x1 ? 1 : -1;
        const verticalDirection = y2 > y1 ? 1 : -1;
        const stepCount = Math.abs(x1 - x2);

        for(let i = 0; i <= stepCount; i++) {
            const x = x1 + (horizontalDirection * i);
            const y = y1 + (verticalDirection * i);
            //console.log(`Recording ${x}, ${y}`)
            result.push([ x, y ])
        }
    }

    return result
};


const locations = input.map(getVentLocations).flatMap(i => i)

const counts = Object.fromEntries(Object.entries(locations.reduce((acc, cur) => {
    const currentCount = acc[cur.join(',')] || 0;
    acc[cur] = currentCount + 1;
    return acc
}, { })).sort(([k, v], [k1, v1]) => v > v1))

//draw(locations)

//console.log(locations);

//console.log(counts);

console.log(Object.values(counts).filter(i => i > 1).length)