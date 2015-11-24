/*!
 * Based on the Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('a.page-scroll').bind('click', function (event) {
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
$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggle:visible').click();
});

// Set the url of the clicked link
$(function () {
  var hash = window.location.hash;
  $('a').click(function (e) {
    window.location.hash = this.hash;
  });
});

function gaInit() {
  $.getScript('//www.google-analytics.com/analytics.js'); // jQuery shortcut
  window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
  ga('create', 'UA-62590784-1', 'auto');

  console.log("Initalized");
  return ga;
};

function gaTrack(path, title) {
  var track =  { page: path, title: title};

  ga = window.ga || gaInit();

  ga('set', track);
  ga('send', 'pageview');

  console.log("Tracked");
};

$("a").click(function(evt) {
  var path = evt.currentTarget.pathname + evt.currentTarget.hash;
  var title = evt.currentTarget.title || evt.currentTarget.text;
  gaTrack(path, title);
});

// Opens modal windows 
$(document).ready(function () {
  if (
    (window.location.href.indexOf('#modallink-') > 0) ||
    (window.location.href.indexOf('#institution-') > 0) ||
    (window.location.href.indexOf('#article-') > 0)) {
    $(window.location.hash).modal('show');
  }
});