"use strict";

$(init);

var $heading1, $regEmail, $regPass1, $regPass2;

function init() {
  $("#navLogin").show();
  $("#navLogout").hide();
  $("#regForm").submit(doRegister);
  $heading1 = $("h1").first();
  $regEmail = $("#regEmail");
  $regPass1 = $("#regPass1");
  $regPass2 = $("#regPass2");
  invertHeaderColor();
}

function invertHeaderColor() {
  setTimeout(function() {
    if($heading1.css("color") === "rgb(0, 0, 0)"){
      $heading1.css("color", "rgb(200, 0, 0)");
    }
    else {
      $heading1.css("color", "rgb(0, 0, 0)");
    }
    // debugger;
    invertHeaderColor();
  }, 750);
}

function doRegister(e) {
  e.preventDefault();
  if($regPass1.val() != $regPass2.val()){
    swal("Passwords must match");
  }
  else{
    $.post("/users/register", {email: $regEmail.val(), password: $regPass1.val()})
    .success(function() {
      swal({
        title: "Registered successfully"
      }, clearRegFields);
    })
    .fail(function(err) {
      swal(JSON.parse(err.responseText).code);
    });
  }
}

function clearRegFields() {
  $regEmail.val("");
  $regPass1.val("");
  $regPass2.val("");
}
