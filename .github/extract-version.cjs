const data = require('./../package.json');
console.log(`::set-output name=version::${data.version}`)