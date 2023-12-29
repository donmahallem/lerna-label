const data = require('../package.json');
console.log(`echo "version=${data.version}" >> $GITHUB_OUTPUT`)