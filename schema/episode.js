"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require('mongoose');

/*
 * Photo can have comments and we stored them in the Photo object itself using
 * this Schema:
 */
var episodeSchema = new mongoose.Schema({
    title: String,     // Title of the episode
    //episode_number: Number, //Number of the episode
	description: String, //Episode's html description
	mp3: String, //Episodes link to the enclosure mp3
	publication_date: Date
});


// the schema is useless so far
// we need to create a model using it
var Episode = mongoose.model('Episode', episodeSchema);

// make this available to our photos in our Node applications
module.exports = Episode;