// Note: Original code is in http://jsfiddle.net/EjZzs/15/
// 'use strict'; moved to fix linting errors.
$(function() {
  'use strict';
  //settings for slider
  var width =  720; 
  // $('jQuery selector').css({"css property name":"css property value"});
  $('.slider').css('width', width);
  $('.slider .slide').css('width', width);
  var animationSpeed = 1000;
  var pause = 3000;
  var currentSlide = 1;
  var $slider = $('#slider'); // Cache the DOM:
  var $slideContainer = $slider.find('.slides');
  // var $slideContainer = $('.slides', $slider);
  var $slides = $slideContainer.find('.slide');
  // var $slides = $('.slide', $slider);
  var interval;
  function startSlider() {
    // Set interval:
    interval = setInterval(function() {
      // animate margin-left:
      $slideContainer.animate({'margin-left': '-=' + width},
        animationSpeed, function() {
        console.log('currentSlide ... ', currentSlide, $slides.length);  
        if (++currentSlide === $slides.length) { // last slide.
          console.log('currentSlide:', currentSlide);
          currentSlide = 1; // Go to first slide.
          $slideContainer.css('margin-left', 0);
        }
      });
    }, pause);
  }
  function pauseSlider() {
    clearInterval(interval); // stops the interval timer.
  }
  $slider // Listen for mouse events (video):
  // Either one seems to work the same.
  // $slideContainer // Listen for mouse events (provide code):
    .on('mouseenter', pauseSlider)
    .on('mouseleave', startSlider);
  startSlider();
});
