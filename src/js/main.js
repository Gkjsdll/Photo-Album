"use strict";

var $navEmail, $navPass;

$(init);

function init() {
  $navEmail = $("#navEmail");
  $navPass = $("#navPass");
  $("#navLogin form").submit(doLogin);
}

function doLogin(e) {
  e.preventDefault();
  $.post("/users/login", {email: $navEmail.val(), password: $navPass.val()})
  .success(function() {
    location.href = "/albums";
  })
  .fail(function(err) {
    try{
      var error = JSON.parse(err.responseText).code;
      error = error.split("_").join(" ").toLowerCase();
      error = error.substr(0, 1).toUpperCase() + error.substr(1);
      swal(error);
    } catch(err2) {
      console.warn(err2);
      if(err.responseText) swal(err.responseText);
    }
  });
}
