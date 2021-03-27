$(document).ready(function() {
  charCounter();

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
// target the right element
// choose the right eventlistener
// effects
// -animation effect
// -dom manipulation