var express = require('express');
var app = express();
var hbs = require('express-handlebars');

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
   res.render('index'); 
});

app.listen(3000, function() {
   console.log('Server listening on port 3000'); 
});