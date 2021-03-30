$(document).ready(function() {
  $("#form-tweet").submit(onSubmit);
  loadTweets();
  showIcons();
});


const onSubmit = function(event) {
  event.preventDefault();
  const userSubmit = $(this).serialize();
  const input = $("textarea").val();

  if (input.length <= 140) {
    $.ajax("/tweets", { method: "POST", data: userSubmit })
      .then(function() {
        loadTweets();
        $("textarea").val("");
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

// prevents cross-site-scripting
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const dayTracker = function(time) {
  let d = new Date();
  let n = d.getTime();
  let date = n - time;
  return Math.floor((date / (60*60*24*1000))) + " days ago"
}

const createTweetElement = function(tweet) {
  let daysSince = dayTracker(tweet.created_at);
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
          <div id="day-counter">${daysSince}</div>
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

// Effect for the tiny icons in the tweet feed
const showIcons = function() {
  $("#tweets-container").mouseover(function() {
    $(".tiny-icons").removeClass("hide");
  });
  $("#tweets-container").mouseout(function() {
    $(".tiny-icons").addClass("hide");
  });
};
