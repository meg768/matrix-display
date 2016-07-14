var random = require('./yow.js').random;
var fileExists = require('./yow.js').fileExists;
var writeJSON = require('./yow.js').writeJSON;
var readJSON = require('./yow.js').readJSON;

console.log(random({A:'Ahh', B:'Bee', C:'See'}));
console.log(random(['A', 'B', 'C']));
console.log(random(100, 101));
console.log(random(1));
console.log(random('Foo'));
console.log(fileExists('test.js'));
console.log(writeJSON('a.json', {a:1}));
console.log(readJSON('a.json'));
