import  populateCountries from "./../api/countries";
const Flatpickr = require("flatpickr");
const gaId = 'UA-42900219-2';
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
    altFormat: "F j, Y",
    "mode": "range"
  });
  $('.select-me').select2({
    placeholder: "Select your country",
    allowClear: true
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
      var key = "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";

      var easyvistaKey = ''
      var helpdesk_code = $('#support-form').find(':selected').attr('data-support-tag');

      var subject = $('#support-form').find(':selected').attr('data-value');

      var msg = "<strong>" + subject  + "</strong><br/>"
      
      if (subject === "Activate My Device") {
        var msg_activation = "<strong>IMEI-MEID:</strong>" + $('#imei_meid').val() + "<br/> " +
          "<strong>ICCID:</strong>" + $('#iccid').val() + "<br/>" +
          "<strong>Device type, Make/Model</strong>:" + $('#device_type').val() + "<br/>" +
          "<strong>Phone Origin</strong>" + $('#phone_origin').val() + "<br/>" +
          "<strong>Mobile #:</strong>" + $('#int_mobile').val() + "<br/>";

        msg += msg_activation;
      }

      if (subject === "Email Connectivity") {
        var msg_email = "<strong>Email Service: </strong>" + $('input[name=email_services]:checked', '#support-form').val() + "<br/>";

        msg += msg_email;
      }

      if (subject === "Add/Remove International Features") {

        var msg_international_activation = "<strong>Country Traveling To:<strong>" + $("#country2").val().join(', ').toString() + "<br/>" +
          "<strong>Dates of Travel:</strong>" + $('#flatpickr').val() + "<br/> " +
          "<strong>International Device Type:</strong>" + $('#int-device_type').val() + "<br/>";

        msg +=  msg_international_activation;
      }

      
       msg += "<strong>Priority</strong>: " + $('input[name=priority]:checked', '#support-form').val() + "<hr/>";

       msg +=
        "<strong>Recipient Email (Who to Contact)</strong>: " + $('#recipient_email').val() + "<br/>" +
        "<strong>Requestor Email</strong>: " + $('#requestor_email').val() + "<br/>" +
        "<strong>Affected Number</strong>: " + $('#recipient_mobile').val() + "<br/>" +
        "<strong>Who to contact</strong>: " + $('input[name=contact-person]:checked', '#support-form').val() + "<hr/>";

        msg += "<strong>Description</strong>: " + $('#description').val();

      var json = {
                    "requests" :
                        [{
                            "Catalog_GUID" : "",
                            "Catalog_Code" : helpdesk_code,
                            "AssetID" : "",
                            "AssetTag" : "",
                            "ASSET_NAME" : "",
                            "Urgency_ID" : "2",
                            "Severity_ID" : "41",
                            "External_reference" : "",
                            "Phone" : "",
                            "Requestor_Identification" : "",
                            "Requestor_Mail" : $('#requestor_email').val(),
                            "Requestor_Name" : "",
                            "Location_ID" : "",
                            "Location_Code" : "",
                            "Department_ID" : "",
                            "Department_Code" : "",
                            "Recipient_ID" : "",
                            "Recipient_Identification" : "",
                            "Recipient_Mail" : $('#recipient_email').val(),
                            "Recipient_Name" : "" ,
                            "Origin" : process.env.EASYVISTA_CODE,
                            "Description" : msg,
                            "ParentRequest" : "",
                            "CI_ID" : "",
                            "CI_ASSET_TAG" : "",
                            "CI_NAME" : "",
                            "SUBMIT_DATE" : ""
                        }]
                };

      $.ajax({
        type: "POST",
        //url: "https://api.elasticemail.com/v2/email/send",
        // headers: {"Authorization": "Bearer " + key},
        data: JSON.stringify(json),
        url: "https://wa.easyvista.com/api/v1/50005/requests",
        headers: {"Authorization": "Basic anN0ZWVsZTp3MXJlbGVzcw=="},
        // contentType: "application/x-www-form-urlencoded",
        contentType: "application/json; charset=UTF-8",
        processData: false,
        // data: {
        //   "subject": subject,
        //   "to": process.env.SUPPORT_EMAIL,
        //   "apikey": "fad6cdd8-a1dc-46c1-8656-0b66371d614b",
        //   "bodyHtml": msg,
        //   "from": $('#recipient_email').val(),
        // },
        // contentType: "application/json; charset=UTF-8",
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
