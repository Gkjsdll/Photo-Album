"use strict";

$(init);

var $heading1;

function init() {
  $("#navLogin").show();
  $("#navLogout").hide();
  $heading1 = $("h1").first();
  invertHeaderColor();
}

function invertHeaderColor() {
  setTimeout(function() {
    if($heading1.css("color") === "rgb(0, 0, 0)"){
      $heading1.css("color", "rgb(200, 0, 0)")
    }
    else {
      $heading1.css("color", "rgb(0, 0, 0)")
    }
    // debugger;
    invertHeaderColor();
  }, 750);
}
