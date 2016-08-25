"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require('mongoose');


//Stores favorites w/ user, and creations w/ clip

var userSchema = new mongoose.Schema({
	id: String, //id of the user
	username: String, //username of the user
	clips: [mongoose.Schema.Types.ObjectId] //list of clips the user has favorited
});



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our photos in our Node applications
module.exports = User;