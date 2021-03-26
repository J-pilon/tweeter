/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
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

    </section>`
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {

      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  }

  return renderTweets(data);
});
