$(document).ready(function() {
  $("body").on('click','#mainNavBar', function(){ $(this).collapse("hide") });
  setBindings();
  parallax();
  scrollLinks();
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
  // // Active link switching
  // $(window).scroll(function() {
  //   var scrollLocation = $(this).scrollTop();
  //
  //   scrollLink.each(function() {
  //     var sectionOffset = $(this.hash).offset().top;
  //     console.log("Offset: " + sectionOffset);
  //
  //     if (sectionOffset <= scrollLocation) {
  //       $(this).parent().addClass("section_active");
  //       $(this).parent().siblings().removeClass("section_active")
  //     }
  //   })
  // })
}

// Parallax
function parallax() {
  $(window).scroll(function() {
    var wScroll = $(window).scrollTop();
    $(".parallax-bg").css("background-position", "center " + (wScroll / 2) + "px")
  })
}
