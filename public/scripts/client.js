/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  $("#form-tweet").submit(onSubmit);
  loadTweets();
  showIcons();
  $("#tweets-container").mouseover(function() {
    $(".tiny-icons").removeClass("hide");
  });
  $("#tweets-container").mouseout(function() {
    $(".tiny-icons").addClass("hide");
  });
});


const onSubmit = function(event) {
  event.preventDefault();
  const userSubmit = $(this).serialize();
  const input = $("textarea").val();

  if (!input) {
    alert("No tweet entered");
  } else {
    $.ajax("/tweets", { method: "POST", data: userSubmit })
      .then(function() {
        // $("textarea").empty();
        loadTweets();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

const loadTweets = function() {
  $.ajax("/tweets", { method: "GET", dataType: "json" })
    .then(function(res) {
      renderTweets(res);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  const text = tweet.content.text;
  let $tweet =
  `<section class="article-tweets"> 
      <header class="article-header">
      <img src=${tweet.user.avatars}>
        <div class="tweeters-icon-name"><div>${tweet.user.name}</div><div class="handler">${tweet.user.handle}</div>
      </div>
      </header>
      <footer class="article-footer">
        <label class="feed-message" for="feed-posts"></label>
        <div class="feed-message">${escape(text)}</div>
        <div class="article-footer">      
          <div id="day-counter">${tweet.created_at}</div>
          <div class="tiny-icons hide"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>         
        </div>
      </footer> 
  </section>`;
  return $tweet;
};

const renderTweets = function(tweets) {
  const container = $("#tweets-container");
  container.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    container.prepend($tweet);
  }
};

const showIcons = function() {
  console.log("here I am");
  $("#article-tweets").hover(function() {
    $(".tiny-icons:hidden").show();
  });
};
