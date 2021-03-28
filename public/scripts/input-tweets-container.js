$(document).ready(function() {
  charCounter();
  hideAlert();
  unhideTweetArea();
});

const charCounter = function() {
  $("textarea").on("input", function() {
    let text = $(this).val();
    if (text.length > 140) {
      $(".counter").val(140 - text.length).addClass("red-counter");
    } else {
      $(".counter").val(140 - text.length).removeClass("red-counter");
    }
  });
};

const hideAlert = function() {
  $("#alert").hide();
  $("textarea").on("input", function() {
    let text = $(this).val();
    if (text.length <= 140) {
      $("#alert").hide();
    } else {
      $("#alert").show();
    }
  });
};

const unhideTweetArea = function() {
  $(".nav-new-tweet").click(function(){
    $("#section-new-tweet:hidden").show();
  })
}


// target the right element
// choose the right eventlistener
// effects
// -animation effect
// -dom manipulation