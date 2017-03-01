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



  $selectOption.on('change', function () {
    var value1 = $(this).val();
    var value = '.' + value1;
    $images.show(200).not(value).hide();
    $('#recipient_mobile').val(($('.alloc_mblnumber').html()));
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

      var subject = $('#support-issues option:selected').data('value');

      var msg =
        "Priority: " + $('input[name=priority]:checked', '#support-form').val() + "\r\n" +
        "Recipient Email (Who to Contact): " + $('#recipient_email').val() + "\r\n" +
        "Reporter Email: " + $('#requestor_email').val() + "\r\n" +
        "Affected Number: " + $('#recipient_mobile').val() + "\r\n" +
        "Who to contact: " + $('input[name=contact-person]:checked', '#support-form').val() + "\r\n" +
        "Description: " + $('#description').val();

      if (subject === "Activate My Device") {
        var msg_activation = "IMEI-MEID:" + $('#imei_meid').val() + "\r\n " +
          "ICCID:" + $('#iccid').val() + "\r\n " +
          "Device type, Make/Model:" + $('#device_type').val() + "\r\n " +
          "Phone Origin" + $('#phone_origin').val() + "\r\n " +
          "Mobile #:" + $('#int_mobile').val() + "\r\n ";

        msg += "<hr/>" + "\r\n" + msg_activation;
      }

      if (subject === "Email Connectivity") {
        var msg_email = "Email Service:" + $('input[name=email_services]:checked', '#support-form').val() + "\r\n ";

        msg += "<hr/>" + "\r\n" + msg_email;
      }

      if (subject === "Add/Remove International Features") {
        var msg_international_activation = "Country Traveling To:" + $("country2").val() + "\r\n" +
          "Dates of Travel:" + $('#flatpickr').val() + "\r\n " +
          "International Device Type:" + $('#int-device_type').val() + "\r\n ";

        msg += "<hr/>" + "\r\n" + msg_international_activation;
      }


      var json = {
        "assignedTo": 59063,
        "inboxId": 1778,
        "subject": $('#support-issues option:selected').data('value'),
        "customerEmail": $('#recipient_email').val(),
        "customerMobileNumber": $('#recipient_mobilenumber').val(),
        "customerPhoneNumber": $('#recipient_phonenumber').val(),
        "message": msg,
        "source": "clean-dashboard",
        "status": "active",
        "tags[]": $('#support-issues option:selected').data('support-tag'),
        "priority": $('input[name=priority]:checked', '#support-form').val()
      };

      // console.log(JSON.stringify(json));

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
