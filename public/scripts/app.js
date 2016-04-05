/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
var template,
    source,
    albums = [];

$(document).ready(function() {
  console.log('app.js loaded!');


  //handlebars template
  source = $('#albums-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: assembleAlbums
  });

  $('#album-form').on('submit', function(event){
    event.preventDefault();
    console.log('clicked submit: ', $(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: prependNewAlbum
    });

  });

  $('#albums').on('click', '.add-song', function(event) {
      console.log('add-song clicked!');
      var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('id: ',id);
  });

}); //end document ready
function assembleAlbums(json){
  albums = json;
  console.log('recieved: ', albums);
  albums.forEach(function(album){
    prependNewAlbum(album);
  });
}

// this function takes a single album and renders it to the page
function prependNewAlbum(album){
  var albumHtml = template(album);
  console.log('rendering album:', album);
  $('#albums').prepend(albumHtml);
}
