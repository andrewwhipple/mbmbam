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
   
    Episode.find(function(err, episodes) {
        if (err) {
            res.sendStatus('500');
            return;
        }
        res.render('index', {eps: episodes}); 
    });
 
});

app.get('/mbmbam/episode/:id', function(req, res) {
    
    console.log(req.params.id);
    Episode.findOne({id: req.params.id}, function(err, episode) {
       if (err) {
           console.log(err);
           res.sendStatus(404);
           return;
       } 
        if (episode) {
            Clip.find({mp3: episode.mp3}, function(err, clips) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.render('episode', {ep: episode, clips: clips});
            });
            
            
            
        } else {
            res.render('404');
        }   
    });
    
});

var counter = 0;
app.post('/parser', upload.array(), function(req, res) {
    
    Episode.findOne({mp3: req.body.mp3}, function (err, episode) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        
        if (!episode) {
           Episode.create({title: req.body.title, description: req.body.description, mp3: req.body.mp3, publication_date: Date(req.body.publication_date)}, function (err, newEpisode) {
               if (err) {
                   console.log(err);
                   res.sendStatus(500);
                   return;
               } else {
                   newEpisode.id = newEpisode._id;
                   
                   console.log(newEpisode);
                   newEpisode.save();
                   res.sendStatus(201);
                   
               }
           });
       } else {
           console.log("Episode found apparently?");
           console.log(episode);
           res.sendStatus(409);
       }
    });
   
    //console.log(req.body);
    
    //console.log(JSON.stringify(requestBody));
    //res.sendStatus(200);
});

app.post('/clip', upload.array(), function(req, res) {
    //res.sendStatus(200);
    

    
    Clip.create({title: req.body.title, description: req.body.description, mp3: req.body.mp3, in_point: req.body.in_point, out_point: req.body.out_point, user: req.body.user}, function( err, clip) {
       if (err) {
           console.log(err);
           res.sendStatus(500);
       } else {
           clip.id = clip._id;
           console.log(clip);
           clip.save();
           res.sendStatus(201);
       } 
        
    });
    

    
});

app.listen(3000, function() {
   console.log('Server listening on port 3000'); 
});