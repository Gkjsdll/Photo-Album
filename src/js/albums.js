"use strict";

$(init);

var $title, $albumListings;

function init() {
  $("#createAlbum").submit(doCreateAlbum);
  $title = $("#title");
  $albumListings = $("#albumListings");
  $albumListings.on("click", ".listing", gotoListing);
}

function doCreateAlbum(e) {
  e.preventDefault();
  $.post("/albums", {title: $title.val()})
  .success(function(data) {
    $title.val("");
    console.log("Saved:", data);
    albumPostCreate(data.title, data._id);
  })
  .fail(function(err) {
    swal({
      title: err.responseText,
      text: "Please try again with a different name"
    });
  });
}

function albumPostCreate(title, id) {
  var listing = $("<div>").addClass("col-xs-4 listing").data("id", id);
  listing.append($("<h2>").text(title));
  $albumListings.append(listing);
}

function gotoListing() {
  var id = $(this).data("id").substr(1);
  id = id.substr(0, id.length-1);
  location.href = `/albums/${id}`;
}
