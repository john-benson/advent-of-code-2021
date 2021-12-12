const fs = require('fs');
const _input = fs
    .readFileSync('./d12.input', 'utf-8')
    .split(/\r?\n/)
    .map(i => i.split('-'));

class Node {
    
}

const isUpper = str => !/[a-z]/.test(str) && /[A-Z]/.test(str);

const buildNodes = (branches) => {

    return branches.reduce((acc, [ left, right ]) => {
        const leftConnections = acc[left] || [];
        const rightConnections = acc[right] || [];

        return { 
            ...acc, 
            [left]: [ ...leftConnections, right ], 
            [right]: [ ...rightConnections, left ]
        };
    }, {});

}

let _paths = [];

const walkAll = (nodes, current = 'start', walked = {}, path = []) => {
    if (current === 'end') {
        _paths.push([ ...path, current ].join(','))
        return [ ...path, current ];
    }
 
    const hasWalkedTwice = Object.values(walked).indexOf(2) >= 0;
    
    if (hasWalkedTwice && walked[current] == 1) {
        return null;
    }

    const possibleNext = nodes[current].filter(i => i !== 'start');
    const validNext = possibleNext.filter(i => (walked[i] || 0) <= (hasWalkedTwice ? 0 : 1));
    

    if (validNext.length === 0) {
        return null;
    }

    const nextWalked = isUpper(current) ? walked : { ...walked, [current]: (walked[current] || 0) + 1};
    const nextPath = [ ...path, current ];

    const nextPaths = validNext.map(next => walkAll(nodes, next, nextWalked, nextPath)).filter(i => i)

    if (nextPaths && Array.isArray(nextPaths[0]) && Array.isArray(nextPaths[0][0])) {
        return nextPaths.flatMap(i => i);
    }
    return nextPaths;
};

walkAll(buildNodes(_input))

console.log(_paths);
console.log(_paths.length);