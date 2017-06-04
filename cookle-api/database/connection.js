var mongoose = require('mongoose');
var connection;

console.log("API: ", process.env.COOKLE);
if (true) {
    connection = mongoose.connect('mongodb://localhost/cookle');
} else {
    connection = mongoose.connect('mongodb://cookle.club:YFczdFKCqzL4bE@80.65.165.60:2721/cookleclub', {auth:{authdb:"admin"}})
}

module.exports = connection;
