var quotes = [
  {author: "Valdo Mocovich", quote: "This is random QUOTE machine. Have fun using it!"},
  {author: "Dr.Seuss", quote: "Don't cry because it's over, smile because it happened."},
  {author: "Oscar Wilde", quote: "I am so clever that sometimes I don't understand a single word of what I am saying."},
  {author: "Marcus Tullius Cicero", quote: "A room without books is like a body without a soul."},
  {author: "Mae West", quote: "You only live once, but if you do it right, once is enough."},
  {author: "Mahatma Gandhi", quote: "Be the change that you wish to see in the world."},
  {author: "Eleanor Roosevelt", quote: "No one can make you feel inferior without your consent."},
  {author: "Mark Twain", quote: "If you tell the truth, you don't have to remember anything."},
  {author: "Elbert Hubbard", quote: "A friend is someone who knows all about you and still loves you."},
  {author: "Oscar Wilde", quote: "Always forgive your enemies, nothing annoys them so much."},
  {author: "André Gide", quote: "It is better to be hated for what you are than to be loved for what you are not."},
  {author: "H. Jackson Brown, Jr", quote: "The best preparation for tomorrow is doing your best today."},
  {author: "Audrey Hepburn", quote: "Nothing is impossible, the word itself says 'I'm possible'!"},
  {author: "Will Rogers", quote: "Even if you’re on the right track, you’ll get run over if you just sit there."},
  {author: "Walt Disney", quote: "The Way Get Started Is To Quit Talking And Begin Doing."},
  {author: "Winston Churchill", quote: "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty."},
  {author: "Will Rogers", quote: "Don’t Let Yesterday Take Up Too Much Of Today."},
  {author: "Brian Tracy", quote: "Imagine Your Life Is Perfect In Every Respect. What Would It Look Like?"},
  {author: "Dr. Henry Link", quote: "We Generate Fears While We Sit. We Overcome Them By Action."},
  {author: "Albert Einstein", quote: "Creativity Is Intelligence Having Fun."},
  {author: "Brian Tracy", quote: "Reading Is To The Mind, As Exercise Is To The Body."},
  {author: "LeBron James", quote: "I like criticism. It makes you strong."},
  {author: "Usain Bolt", quote: "There are better starters than me but I’m a strong finisher."},
  {author: "Dennis Ritchie", quote: "UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity."},
  {author: "Confucius", quote: "Choose a job you love, and you will never have to work a day in your life."},
  {author: "Eleanor Roosevelt", quote: "The future belongs to those who believe in the beauty of their dreams."},
  {author: "W. Clement Stone", quote: "Aim for the moon. If you miss, you may hit a star."},
  {author: "Sam Levenson", quote: "Don’t watch the clock; do what it does. Keep going."},
  {author: "Walt Disney", quote: "All our dreams can come true if we have the courage to pursue them."},
  {author: "Edward Snowden", quote: "Even if you're not doing anything wrong, you are being watched and recorded."},
  {author: "Anonymous", quote: "If it doesn't challenge you, it won't change you."},
  {author: "Arthur Ashe", quote: "Start where you are. Use what you have. Do what you can."},
  {author: "Robert Kiyosaki", quote: "Don't let the fear of losing be greater than the excitement of winning."},
  {author: "Helen Hayes", quote: "Every expert was once beginner"},
];

function rndColor() {
    var r = Math.floor(Math.random() * 100) + 50;
    var g = Math.floor(Math.random() * 100) + 50;
    var b = Math.floor(Math.random() * 100) + 50;
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function rndNum() {
  return Math.floor(Math.random() * quotes.length);
}

function randomQuote() {
  var index = rndNum() + 1;
  document.getElementById("quote").innerHTML = '<i id=blockquote class="fa fa-quote-right fa-2x"></i>' + quotes[index].quote;
  document.getElementById("author").innerHTML = "- " + quotes[index].author;
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quotes[index].quote + '" -' + quotes[index].author));
}

var quote ="#quote, #author";

$(document).ready(function() {
  var openingColor = rndColor();
  $("body, .btn-lg").css({backgroundColor: openingColor});
  $(quote).css({color: openingColor});
  $("#twitter-icon").css({color: openingColor});
  // $("#twitter-icon").hide();
  document.getElementById("quote").innerHTML = '<i id=blockquote class="fa fa-quote-right fa-2x"></i>' + quotes[0].quote;
  document.getElementById("author").innerHTML = "- " + quotes[0].author;
  $("#btn").on("click", function() {
    randomColor = rndColor();
    $(quote).slideUp({duration: 500});
    $(quote).slideDown({duration: 500});
    $("body, .btn-lg").animate({backgroundColor: randomColor}, 1000);
    $("#twitter-icon").animate({color: randomColor}, 1000);
    setTimeout(function() {
      $(quote).css({color: randomColor});
      randomQuote()
    }, 500);
  });
});
