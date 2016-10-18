// Note: Original code is in http://codepen.io/anon/pen/mJyQez
$( function () {
  // https://www.youtube.com/watch?v=1nWrIBB_bMA 12:45
  $('.tab-panels .tabs li').on('click', function() {
    // Save the div panel to show. [Moved to here from below.]
    var $panelToShow = $(this).attr('data-panel');
    // Find and save the div of panels (.tab-panels) for this clicked li.
    var $panel = $(this).closest('.tab-panels');
    // Find the active li in the div of panels and remove its active state.
    $panel.find('.tabs li.active').removeClass('active');
    // Assign the active state to the li of the clicked panel div.
    $(this).addClass('active');
    // // Save the div panel to show. [Moved to top from here.]
    // var $panelToShow = $(this).attr('data-panel');
    // Hide the clicked panel.
    // $panel.find('.panel.active').slideUp(300, showNextPanel); 
    $panel.find('.panel.active').fadeOut(1, showNextPanel); 
    //show div panel of the clicked li. 
    function showNextPanel() { // cb (callback) fcn:
      $(this).removeClass('active'); // Temporarily remove active state.
      // $('#' + panelToShow).slideDown(300, function() {  // anonyomous cb fcn.
      $('#' + $panelToShow).fadeIn(700, function() {  // anonyomous cb fcn.  
          // Re-assign active state to the clicked panel:
          $(this).addClass('active');
      });
    }
  });
});
// Note: showNextPanel() might better be called showContentsOfSelectedPanel().
// I Changed behavior of showing the contents of the selected panel 
//  -- the panel does not jump up and down, which I found unpleasant.
// "Removed/changed" code from video has been left in comments.
