$('.pic').hover((event) => {
  $(event.currentTarget.children[0]).stop().animate({opacity: 0.4}, 400);
  $(event.currentTarget.children[1]).stop().animate({height: 210, 'filter': 'blur(0px)'}, 400);
  $(event.currentTarget.children[2]).stop().animate({color: "#fff"}, 400);
}, function(event) {
  $(event.currentTarget.children[0]).stop().animate({opacity: 0.7}, 400);
  $(event.currentTarget.children[1]).stop().animate({height: 200}, 400);
  $(event.currentTarget.children[2]).stop().animate({color: "#fff"}, 400);
});

$('.another input').focus(() => {
  $('.suggestion').fadeIn(300);
}).blur(() => {
  $('.suggestion').fadeOut(300);
});






// }, () => {
//   $('.suggestion').fadeOut(300);
// });
