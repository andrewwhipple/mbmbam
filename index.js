var express = require('express');
var app = express();
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();

var mongoose = require('mongoose');

var Episode = require('./schema/episode.js');
var Clip = require('./schema/clip.js');
var User = require('./schema/user.js');
var SchemaInfo = require('./schema/schemaInfo.js');

mongoose.connect('mongodb://localhost/mbmbam');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.json());
//app.use(express.urlencoded());


app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
   res.render('index'); 
});



var counter = 0;
app.post('/parser', upload.array(), function(req, res) {
    /*
    
    Something like if not find ep w/ this mp3, create a new episode
    
    
    Episode.findOne({mp3: req.params.})
    
    */
   //if (!req.body) return res.sendStatus(400);
    //var requestBody = "";
    
    console.log(req.body.title);
    console.log(counter);
    counter++;
   
    //console.log(req.body);
    
    //console.log(JSON.stringify(requestBody));
    res.sendStatus(200);
});
app.listen(3000, function() {
   console.log('Server listening on port 3000'); 
});