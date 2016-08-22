var express = require('express');
var app = express();
var hbs = require('express-handlebars');

var mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost/mbmbam_database');

var Schema = mongoose.Schema, 
    ObjectId = Scheme.ObjectId;

var Episode = new Schema({
    title: String,
    epNum: Number,
    description: String,
    mp3: String,
    pubDate: Date,
    brothers: [Brother]
});

var Clip = new Schema({
    episode: Episode,
    inPoint: Number,
    outPoint: Number,
    mvp: Brother
});

var Brother = new Schema({
    name: String,
    description: String
});


app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
   res.render('index'); 
});

app.listen(3000, function() {
   console.log('Server listening on port 3000'); 
});