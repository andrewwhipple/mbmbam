/* jshint node: true */
/* global Promise */

/*
 * This Node.js program loads the CS142 Project #5 model data into Mongoose defined objects
 * in a MongoDB database. It can be run with the command:
 *     node loadDatabase.js
 * be sure to have an instance of the MongoDB running on the localhost.
 *
 * This script loads the data into the MongoDB database named 'cs142project6'.  In loads
 * into collections named User and Photos. The Comments are added in the Photos of the
 * comments. Any previous objects in those collections is discarded.
 *
 * NOTE: This scripts uses Promise abstraction for handling the async calls to
 * the database. We are not teaching Promises in CS142 so strongly suggest you don't
 * use them in your solution.
 *
 */

// Get the magic models we used in the previous projects.

// We use the Mongoose to define the schema stored in MongoDB.
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mbmbam');

// Load the Mongoose schema for Use and Photo
var Episode = require('./schema/episode.js');
var Clip = require('./schema/clip.js');
var User = require('./schema/user.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var versionString = '1.0';

// We start by removing anything that existing in the collections.
var removePromises = [Episode.remove({}), Clip.remove({}), User.remove({}), SchemaInfo.remove({})];

Promise.all(removePromises).then(function () {
    mongoose.disconnect();
});