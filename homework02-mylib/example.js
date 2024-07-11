const passgen = require('./passgen');
const password = passgen.generate('Hard', 64, true, true);
console.log(password);