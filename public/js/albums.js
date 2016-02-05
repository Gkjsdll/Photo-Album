"use strict";

$(init);

var $title, $albumListings;

function init() {
  $("#createAlbum").submit(doCreateAlbum);
  $title = $("#title");
  $albumListings = $("#albumListings");
}

function doCreateAlbum(e) {
  e.preventDefault();
  $.post("/albums", {title: $title.val()})
  .success(function(data) {
    $title.val("");
    console.log("Saved:", data);
    albumPostCreate(data.title);
  })
  .fail(function(err) {
    console.warn(err);
  });
}

function albumPostCreate(title) {
  var listing = $("<div>").addClass("col-xs-4 listing");
  listing.append($("<h2>").text(title));
  $albumListings.append(listing);
}
