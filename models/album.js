var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = require('./song');


var AlbumSchema = new Schema ({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [ Song.schema ]
});

var Album = mongoose.model('Album', AlbumSchema);

// exports Album schema to be accessible to all files
module.exports = Album;
