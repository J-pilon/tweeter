$(document).ready(function() {
  charCounter();
  hideAlert();
});

const charCounter = function() {
  $("textarea").on("input", function() {
    let text = $(this).val();
    if (text.length > 140) {
      $(".counter").val(140 - text.length).addClass("red-counter");
    } else {
      $(".counter").val(140 - text.length).removeClass("red-counter");
    }
    // why is this bad practice?
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
// target the right element
// choose the right eventlistener
// effects
// -animation effect
// -dom manipulation