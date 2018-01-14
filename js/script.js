$(document).ready(function() {
  $("body").on('click','#mainNavBar', function(){ $(this).collapse("hide") });
  setBindings();
  parallax();
  objectAppear();
  typing();
});

//Smooth scrolling
function setBindings() {
  var scrollLink = $(".scroll")
  scrollLink.click(function(e){
    e.preventDefault();
    $("body, html").animate({
      scrollTop: $(this.hash).offset().top
    }, 1000, "easeInOutExpo")
  })
}

// Parallax
function parallax() {
  var screenWidth = $(document).width() + 15;

  if (screenWidth > 480) {
    $(window).scroll(function() {
      var wScroll = $(window).scrollTop();

      $(".parallax-bg").css("background-position", "center -" + (wScroll / 3) + "px")
    })
  }
}


//Animate content when scrolling
function objectAppear() {
  var windowHeight = $(window).height();
  var scrollFromTop = $(window).scrollTop();
  var windowScrollPosBottom = scrollFromTop + windowHeight;

  jQuery.fn.revealOnScroll = function() {
    return this.each(function() {
      var itemOffset = $(this).offset().top + 170;
      if (!$(this).hasClass('hiding')) {
        $(this).css({'opacity': 0, 'padding-top': '300px'}).addClass('hiding');
      }

      if (!$(this).hasClass('animation-complete')) {
        if (windowScrollPosBottom > itemOffset) {
          $(this).animate({'opacity': 1, 'padding-top': '0px'}, 1000).addClass('animation-complete');
        }
      }
    });
  }

  $('.project').revealOnScroll();

  $(window).on('scroll', function() {
    windowHeight = $(window).height();
    scrollFromTop = $(window).scrollTop();
    windowScrollPosBottom = scrollFromTop + windowHeight;
    $('.project').revealOnScroll();

  })
}



// Typing animation function using TypeIt https://typeitjs.com/

function typing() {
  var text = ['web applications', 'web interfaces'];
  var delay = 4000;
  new TypeIt('.type-it', {
    strings: text,
    speed: 50,
    breakLines: false,
    autoStart: false,
    loop: true,
    loopDelay: delay,
    nextStringDelay: delay
  });
}
