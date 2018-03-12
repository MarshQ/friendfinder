var bodyParser = require ('body-parser');
var express = require ('express');
var path = require ('path');
var PORT = 8080;
var app = express ();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/public')));

require ('./app/routing/apiRoutes.js')(app);
require ('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});
