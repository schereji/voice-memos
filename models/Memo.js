var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var memoSchema = new Schema({
	description: String,
	audioUrl: String,
	date: String
});

module.exports = mongoose.model('Memo', memoSchema);
