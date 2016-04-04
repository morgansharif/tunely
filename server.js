// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express(),
    db = require('./models');

// require body-parser
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

//body parser config
app.use(bodyParser.urlencoded({extended: true}));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

//get all albums
app.get('/api/albums', function(req, res){
  console.log("GET '/api/albums' TRIGGERED");
  db.Album.find(function (err, albums){
    if (err){console.log('--error: ', err);}
    console.log('--res:',albums);
    res.json(albums);
  });
});

app.post('/api/albums', function(req, res){
  console.log("POST '/api/albums' TRIGGERED");
  console.log('--req:', req.body);
  var newAlbum = new db.Album(req.body);
  newAlbum.save(function(err, album){
  if (err) {return console.log("save error: " + err);}
  console.log('--res:',album);
  res.json(album);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
