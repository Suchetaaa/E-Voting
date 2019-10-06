const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath1 = path.resolve(__dirname, 'Contracts', 'AltBn128.sol');
const inboxPath2 = path.resolve(__dirname, 'Contracts', 'LSAG.sol');
const inboxPath3 = path.resolve(__dirname, 'Contracts', 'e_voting.sol');


const source1 = fs.readFileSync(inboxPath1, 'utf8'); 
const source2 = fs.readFileSync(inboxPath2, 'utf8'); 
const source3 = fs.readFileSync(inboxPath3, 'utf8'); 

console.log(solc.compile(source1, 1));
console.log(solc.compile(source2, 1));
console.log(solc.compile(source3, 1));