import * as express from 'express';
import * as path from 'path';
var app = module.exports.app = exports.app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('Open http://localhost:8080');