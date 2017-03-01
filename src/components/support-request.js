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
    altInput: true,
    altFormat: "F j, Y"
  });

  var $select = $('#support-form .user-actions');
  $select.on('change', function () {
    var value = '.' + $(this).val();
  });

  var $selectOption = $('.user-actions'), $images = $('.mix');
  var affectedNum;


  $selectOption.on('change', function () {
    var value1 = $(this).val();
    var value = '.' + value1;
    $images.show(200).not(value).hide();
      if ($(this).prop('id') == 'choose-issues') {
          $('#recipient_mobile').val(($('.alloc_mblnumber').html()));
      }
    $('.btn-provision').click();
    $select.prop('value', value1);

  });
  $('.btn-provision').click(function () {
    $('#recipient_email').val(JSON.parse(localStorage.getItem("userProfile")).email);
      $('#requestor_email').val(JSON.parse(localStorage.getItem("userProfile")).email);
    $('#recipient_firstname').val(JSON.parse(localStorage.getItem("userProfile")).firstName);
    $('#recipient_lastName').val(JSON.parse(localStorage.getItem("userProfile")).lastName);

    $('.support-form-holder').show(200);
  });

  $('#btn-close').click(function () {
    $('#support-form')[0].reset();
    $images.hide();
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
      var company = "wirelessanalytics";
      var key = "PMf04HTtZ7dNDIS2gmQCUWWRw0IwaHvdoa3MYQ6Fg6f23s8zrr";
      var helpdesk_code = $('#support-form').find(':selected').attr('data-support-tag');

      var subject = $('#support-issues').val();

      var msg =
        "<strong>Priority</strong>: " + $('input[name=priority]:checked', '#support-form').val() + "<br/>" +
        "<strong>Recipient Email (Who to Contact)</strong>: " + $('#recipient_email').val() + "<br/>" +
        "<strong>Reporter Email</strong>: " + $('#requestor_email').val() + "<br/>" +
        "<strong>Affected Number</strong>: " + $('#recipient_mobile').val() + "<br/>" +
        "<strong>Who to contact</strong>: " + $('input[name=contact-person]:checked', '#support-form').val() + "<br/>" +
        "<strong>Description</strong>: " + $('#description').val();

      if (subject === "Activate My Device") {
        var msg_activation = "<strong>IMEI-MEID:</strong>" + $('#imei_meid').val() + "<br/> " +
          "<strong>ICCID:</strong>" + $('#iccid').val() + "<br/>" +
          "<strong>Device type, Make/Model</strong>:" + $('#device_type').val() + "<br/>" +
          "<strong>Phone Origin</strong>" + $('#phone_origin').val() + "<br/>" +
          "<strong>Mobile #:</strong>" + $('#int_mobile').val() + "<br/>";

        msg += "<hr/>" + "<br/>" + msg_activation;
      }

      if (subject === "Email Connectivity") {
        var msg_email = "<strong>Email Service:</strong>" + $('input[name=email_services]:checked', '#support-form').val() + "<br/>";

        msg += "<hr/>" + "<br/>" + msg_email;
      }

      if (subject === "Add/Remove International Features") {
        var msg_international_activation = "Country Traveling To:" + $("country2").val() + "<br/>" +
          "<strong>Dates of Travel:</strong>" + $('#flatpickr').val() + "<br/> " +
          "<strong>International Device Type:</strong>" + $('#int-device_type').val() + "<br/>";

        msg += "<hr/>" + "\r\n" + msg_international_activation;
      }

      msg += "<br/><br/>"  + "@CODE_CATALOG@='" + helpdesk_code + "'";

      var json = {
        "assignedTo": 59063,
        "inboxId": 1778,
        "subject": $('#support-issues').val(),
        "customerEmail": $('#recipient_email').val(),
        "customerMobileNumber": $('#recipient_mobile').val(),
        "customerPhoneNumber": $('#recipient_mobile').val(),
        "message": msg,
        "source": "clean-dashboard",
        "status": "active",
        "tags[]": helpdesk_code,
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
