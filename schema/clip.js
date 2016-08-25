"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require('mongoose');

var clipSchema = new mongoose.Schema({
    title: String,     // User-gen title of the clip
    //episode_number: Number, //Number of the episode the clip is from
	description: String, //User gen description of the clip
	mp3: String, //Episodes link to the enclosure mp3 for the ep
	in_point: Number, //Number of seconds from the beginning of the episode the clip starts at
	out_point: Number, //Number of seconds from the beginning of the episode the clip ends at
	//mvp: String, //id of the brother who is the mvp of the clip
	user: String //User_id of the user that originally created the clip
});

/*var brotherSchema = new mongoose.Schema({
	id: String, //unique id of the brother
	name: String, //name of the brother
	description: String //description of the brother
});*/

// the schema is useless so far
// we need to create a model using it
var Clip = mongoose.model('Clip', clipSchema);

// make this available to our photos in our Node applications
module.exports = Clip;