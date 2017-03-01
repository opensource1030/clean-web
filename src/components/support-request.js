import  populateCountries from "./../api/countries";
const Flatpickr = require("flatpickr");
function supportRequest() {
  populateCountries.populateCountries("country2");
  $('.eq-Hght').matchHeight({
    byRow: true,
    property: 'height',
    target: null,
    remove: false
  });
  let calendar = new Flatpickr(document.getElementById('flatpickr'), {
    maxDate: new Date(),
    altInput: true,
    altFormat: "F j, Y"
  });

  var $select = $('#support-form .user-actions');
  $select.on('change', function () {
    var value = '.' + $(this).val();
  });

  var $selectOption = $('.user-actions'), $images = $('.mix');
  var affectedNum;
  $('.wireless-overview .user-actions').on('change', function () {
    affectedNum = $(this).parentsUntil('tbody').find('.alloc_mblnumber').html();
  });

  $('#choose-issues').on('change', function () {
    affectedNum = $(this).parentsUntil('tbody').find('.user-info span').html();
  });


  $selectOption.on('change', function () {
    var value1 = $(this).val();
    var value = '.' + $(this).children('option:selected').data('id');
    $images.show(200).not(value).hide();
    $('#recipient_mobilenumber').val(affectedNum);
    $('.btn-provision').click();
    $select.prop('value', value1);

  });
  $('.btn-provision').click(function () {
    $('#recipient_email').val(JSON.parse(localStorage.getItem("userProfile")).email);
    $('#recipient_firstname').val(JSON.parse(localStorage.getItem("userProfile")).firstName);
    $('#recipient_lastName').val(JSON.parse(localStorage.getItem("userProfile")).lastName);

    $('.support-form-holder').show(200);
  });

  $('#btn-close').click(function () {
    $('#support-form')[0].reset();
    $('.support-form-holder').hide(200);
    $selectOption.prop('selectedIndex', 0);
  });

  /*$(document).keyup(function (e) {
   if (e.keyCode == 27)
   $('#btn-close').click();
   });*/

  $("#support-form").validate({
    rules: {
      "description": {
        required: true,
        minlength: 8
      }
    },
    submitHandler: function (form) {
      var form = $('#support-form');
      var $modal = $('#modal');

      var msg_activation = "";
      var msg_email = "";
      var msg_international_activation = "";

      var json = {
        "assignedTo": 59063,
        "inboxId": 1778,
        "subject": $('#support-issues').data('value'),
        "customerEmail": $('#recipient_email').val(),
        "customerMobileNumber": $('#recipient_mobilenumber').val(),
        "customerPhoneNumber": $('#recipient_phonenumber').val(),
        "message": $('#description').val() + ' ' + ' Preferred:' + ' ' + $('input[name=method]:checked', '#support-form').val(),
        "source": "clean-dashboard",
        "status": "active",
        "tags[]": $('#tags').val(),
        "priority": $('input[name=priority]:checked', '#support-form').val()
      };
      $.ajax({
        type: "POST",
        url: "https://" + company + ".teamwork.com/desk/v1/tickets.json",
        headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
        data: JSON.stringify(json),
        processData: false,
        contentType: "application/json; charset=UTF-8",
        beforeSend: function () {
          $('.support-form-holder').addClass('loading');
        },
        success: function () {
          $modal.html('');
          $modal.removeClass('is-error').addClass('is-success').append("<h4>Ticket Opened Successfully </h4>" + "<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
          $('.support-form-holder').removeClass('loading');
          $('#support-form')[0].reset();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          $('.support-form-holder').removeClass('loading');
          $('#modal').html('');
          $modal.removeClass('is-success').addClass('is-error').append("<h4>" + "Status: " + textStatus + "</h4>" + "<p>" + "Error: " + errorThrown + "</p>" + "<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
        }
      });
    }
  });

}

export default supportRequest;
