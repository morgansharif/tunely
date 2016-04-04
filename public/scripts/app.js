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
    console.log('clicked submit: ',$(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: assembleAlbums

    });

  });


}); //end document ready

function assembleAlbums(json){
  albums = json;
  console.log('recieved: ', albums);
  albums.forEach(function(album){
    var albumHtml = template(album);
    console.log('rendering album:', album);
    // this function takes a single album and renders it to the page
    $('#albums').prepend(albumHtml);
  });
}
