var express = require('express');
var path = require('path');
var bodyParser = require ('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 8080;
var app = express();
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(_dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exended: false}));

app.use('/', index);
app.use('api', tasks);

app.listen(port, function()
{console.log('Server started on port' +port);}
);
