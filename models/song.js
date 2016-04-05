var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema ({
  name: String,
  trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

// exports Song schema to be accessible to all files
module.exports = Song;
