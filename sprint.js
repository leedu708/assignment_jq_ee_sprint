$(document).ready( function() {

  $('.field-wrapper').bind('change paste keyup', 'input', function() {
    // grab input target
    var $input = $(event.target);

    // determine maxChars based on input type
    var maxChars = maxLength($input[0].id);

    // calculate chars remaining by subtracting current input value.length
    var charsRemaining = maxChars - $input.val().length;

    // grab field-text tags to give user feedback
    var $field = $input.siblings('.field-text');

    // field-text area is hidden if you still have maxChars remaining
    if (charsRemaining === maxChars) {
      $field.addClass('hidden');
    }

    // show field-text area if input.val().length
    else {
      $field.removeClass('hidden');
      $field.text(charsRemaining + " characters remaining.");
    };

    if ($input[0].id === 'confirm-password') {
      checkConfirmation();
    };

  });

  var maxLength = function(inputID) {
    switch(inputID) {
      case 'title':
        return 32;
        break;

      case 'body':
        return 140;
        break;

      default:
        return 16;
        break;
    }
  }

  var minLength = function(inputID) {
    switch(inputID) {
      case 'title':
        return 4;
        break;

      case 'body':
        return 4;
        break;

      default:
        return 6;
        break;
    }
  }

  var checkConfirmation = function() {
    var password = $('#password').val();
    var $confirmation = $('#confirm-password');
    var $fieldText = $confirmation.siblings('.confirm-text');

    if (password === $confirmation.val()) {
      $fieldText.addClass('success');
      $fieldText.removeClass('failure');
      $fieldText.text("Passwords match");
    }

    else {
      $fieldText.addClass('failure');
      $fieldText.removeClass('success');
      $fieldText.text("Passwords do not match...");
    }
  }

  var validateFieldLength = function(index, field) {
    var $field = $(field);
    var min = minLength($field[0].id);
    var max = maxLength($field[0].id);

    if ($field.val().length >= min && $field.val().length <= max) {
      updateValidationText($field, '')
      $field.removeClass('invalid');
    }

    else if ($field.val().length < min) {
      updateValidationText($field, 'Must be at least ' + min + ' characters.')
      $field.addClass('invalid');
    }

    else {
      updateValidationText($field, 'Cannot be more than ' + max + ' characters.')
      $field.addClass('invalid');
    };
  }

  var updateValidationText = function(Obj, newText) {
    var $textField = Obj.siblings('.field-text');
    $textField.text(newText);
  }

  $(':submit').on('click', function() {
    event.preventDefault();
    var $fields = $('.field-wrapper input, textarea');
    $fields.each ( validateFieldLength );
    checkConfirmation();
  });

  $('.selected').on('click', function() {
    var $dropdown = $('.select-list');

    if ($dropdown.hasClass('hidden')) {
      $dropdown.slideDown(500);
      $dropdown.removeClass('hidden');
    }

    else {
      $dropdown.slideUp(500);
      $dropdown.addClass('hidden');
    };

  })

});