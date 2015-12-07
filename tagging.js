$(document).ready( function() {

// Create & Deleting functions
  var makeActiveTagger = function() {
    if ($('.active').length === 0) {
      $(event.target).after("<div class='tagger active'></div>");
      trackMouse();
    }
  }

  var deleteActiveTagger = function() {
    $('.active').remove();
  }

// Movement functions
  var setActivePosition = function(x, y) {
    $('.active').css('left', x - 25);
    $('.active').css('top', y - 25);
  }

  var trackMouse = function() {
    $image = $('img');
    var minX = $image.offset().left
    var minY = $image.offset().top;
    var maxX = minX + $image.width();
    var maxY = minY + $image.height();

    $('.tagger').mousemove( function() {
      setActivePosition(event.pageX, event.pageY);

      // make sure mouse is within image
      if (event.pageX < minX || event.pageX > maxX || event.pageY < minY || event.pageY > maxY) {
        deleteActiveTagger();
      };
    });

    // smooth out very fast mouse moves
    $('img').mousemove( function() {
      setActivePosition(event.pageX, event.pageY);
    });

  }

// Tagging functions
  var freezeActiveTagger = function() {
    $('.tagger').off('mousemove');
    $('img').off('mousemove');
    showDropdown();
  }

  var showDropdown = function() {
    var $nameList = $("<ul class='dropdown'><li>Name1</li><li>Name2</li><li>Name3</li></ul>");
    $nameList.insertAfter($('.active')).hide().slideDown(500);
    $('.dropdown').css('left', event.pageX - 32);
    $('.dropdown').css('top', event.pageY + 34);
  }

  var cancelDropdown = function() {
    $('.dropdown').slideUp(100, removeDropdown );
    setActivePosition(event.pageX, event.pageY);
    trackMouse();
  }

  var removeDropdown = function() {
    $('.dropdown').remove();
  }

  var confirmTag = function() {
    if (event.target.nodeName === 'LI' ) {
      var $target = $(event.target);
      var $tagger = $('.active');

      $tagger.text($target.text());
      $tagger.removeClass('active');
      removeDropdown();
    }
  }

// Event listeners
  $('img').mouseenter( makeActiveTagger );
  $('.image-wrapper').on('click', '.active', freezeActiveTagger );
  $('.image-wrapper').on('click', 'li', confirmTag );
  $('img').click( cancelDropdown );

})