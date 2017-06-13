var mongoose = require('mongoose');
var connection;

console.log("API: ", process.env.COOKLE);
if (false) {
    connection = mongoose.connect('mongodb://localhost/cookle');
} else {
    connection = mongoose.connect('mongodb://cookle.club:YFczdFKCqzL4bE@localhost:2721/cookleclub', {auth:{authdb:"admin"}})
}

module.exports = connection;
