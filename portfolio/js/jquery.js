$(document).ready(function() {
  $("body").on('click','#mainNavBar', function(){ $(this).collapse("toggle"); });
  setBindings();
});

function setBindings() {
  var scrollLink = $(".scroll")

  //Smooth scrolling
  scrollLink.click(function(e){
    e.preventDefault();
    $("body, html").animate({
      scrollTop: $(this.hash).offset().top
    }, 1000)
  })
}
