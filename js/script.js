$(document).ready(function() {
  $("body").on('click','#mainNavBar', function(){ $(this).collapse("hide") });
  setBindings();
  parallax();
});

//Smooth scrolling
function setBindings() {
  var scrollLink = $(".scroll")
  scrollLink.click(function(e){
    e.preventDefault();
    $("body, html").animate({
      scrollTop: $(this.hash).offset().top - 50
    }, 1000, "easeInOutExpo")
  })
}

// Parallax
function parallax() {
  var screenWidth = $(document).width() + 15;
  if (screenWidth > 480) {
    $(window).scroll(function() {
      var wScroll = $(window).scrollTop();
      $(".parallax-bg").css("background-position", "center " + (wScroll / 3) + "px")
    })
  }
}
