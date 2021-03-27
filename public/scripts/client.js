/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  $("#form-tweet").submit(onSubmit);
  loadTweets();
  
});

const onSubmit = function(event) {
  event.preventDefault();
  const userSubmit = $(this).serialize();
  $.ajax("/tweets", { method: "POST", data: userSubmit })
    .then(function() {
      loadTweets();
    })
    .catch(function(err) {console.log(err)})
};

const loadTweets = function() {
  $.ajax("/tweets", { method: "GET", dataType: "json" })
    .then(function(res) {renderTweets(res)})
    .catch(function(err) {console.log(err)});
};

const createTweetElement = function(tweet) {
  let $tweet =
  `<section id="tweets-container">
      <header class="article-header">
        <img ${tweet.user.avatars}>
        <div class="tweeters-icon-name"><div>${tweet.user.name}</div><div>${tweet.user.handle}</div>
      </div>
      </header>
      <footer class="article-footer">
        <label class="feed-message" for="feed-posts"></label>
        <div class="feed-message">${tweet.content.text}</div>
        <div class="article-footer">      
          <div id="day-counter">days</div>
          <div><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>         
        </div>
      </footer> 
  </section>`;
  return $tweet;
};

const renderTweets = function(tweets) {
  const container = $("#tweets-container")
  container.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    container.prepend($tweet);
  }
};
