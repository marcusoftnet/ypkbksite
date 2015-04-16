/*!
 * Based on the Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Set the url of the clicked link
$(function(){
  var hash = window.location.hash;
  $('a').click(function (e) {
    window.location.hash = this.hash;
  });
});

// Opens modal windows for hospitals ... and clinics
$(document).ready(function() {
  if(
    (window.location.href.indexOf('#modallink-') > 0) ||
    (window.location.href.indexOf('#institution-') > 0) ||
  	(window.location.href.indexOf('#news-') > 0)) {
      $(window.location.hash).modal('show');
  }
});