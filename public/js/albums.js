"use strict";

$(init);

var $title;

function init() {
  $("#createAlbum").submit(doCreateAlbum);
  $title = $("#title");
}

function doCreateAlbum(e) {
  e.preventDefault();
  $.post("/albums", {title: $title.val()})
  .success(function(data) {
    $title.val("");
    console.log("Saved:", data);
  })
  .fail(function(err) {
    console.warn(err);
  });
}
