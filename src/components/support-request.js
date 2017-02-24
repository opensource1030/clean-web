import  populateCountries from "./../api/countries";
const Flatpickr = require("flatpickr");
function supportRequest(){
       populateCountries.populateCountries("country2");
        $('.eq-Hght').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    let calendar = new Flatpickr(document.getElementById('flatpickr'),{
        maxDate: new Date(),
        altInput: true,
        altFormat: "F j, Y"
    });


        var $select = $('#support-form .user-actions');


        var $select = $('#support-form .user-actions');
        $select.on('change', function () {
            var value = '.' + $(this).val();
        });

        var $selectOption = $('.user-actions'), $images =  $('.mix');
         var affectedNum ;
            $('.wireless-overview .user-actions').on('change',function(){
                affectedNum = $(this).parentsUntil('tbody').find('.alloc_mblnumber').html();
            });

        $('#choose-issues').on('change',function(){
            affectedNum = $(this).parentsUntil('tbody').find('.user-info span').html();
        });




        $selectOption.on('change', function () {
            var value1 = $(this).val();
            var value = '.' + $(this).val();
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

        $(document).keyup(function (e) {
            if (e.keyCode == 27) $('#btn-close').click();
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
                var json = {
                    "requests" :
                        [{
                            "Catalog_GUID" : "",
                            "Catalog_Code" : $('#FilterSelect').val(),
                            "AssetID" : "",
                            "AssetTag" : "",
                            "ASSET_NAME" : "",
                            "Urgency_ID" : "2",
                            "Severity_ID" : "41",
                            "External_reference" : "",
                            "Phone" : $('#recipient_mobile').val(),
                            "Requestor_Identification" : "",
                            "Requestor_Mail" : $('#requestor_mail').val(),
                            "Requestor_Name" : "",
                            "Location_ID" : "",
                            "Location_Code" : $('#country2').val(),
                            "Department_ID" : "",
                            "Department_Code" : "",
                            "Recipient_ID" : JSON.parse(localStorage.getItem("userProfile")).id,
                            "Recipient_Identification" : JSON.parse(localStorage.getItem("userProfile")).identification,
                            "Recipient_Mail" : $('#recipient_email').val(),
                            "Recipient_Name" : JSON.parse(localStorage.getItem("userProfile")).firstName,
                            "Origin" : "2",
                            "Description" : $('#description').val(),
                            "ParentRequest" : "",
                            "CI_ID" : "",
                            "CI_ASSET_TAG" : "",
                            "CI_NAME" : "",
                            "SUBMIT_DATE" : ""
                        }]
                };
                $.ajax({
                    type: "POST",
                    url: "https://wa.easyvista.com/api/v1/50005/requests",
                    headers: {"Authorization": "Basic anN0ZWVsZTp3MXJlbGVzcw=="},
                    data : JSON.stringify(json),
                    processData: false,
                    contentType: "application/json; charset=UTF-8",
                    success: function(){
                        $modal.html('');
                        $modal.removeClass('is-error').addClass('is-success').append("<h4>Request sent succefully </h4>" +"<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
                        $('#support-form')[0].reset();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        $('#modal').html('');
                        $modal.removeClass('is-success').addClass('is-error').append("<h4>"+"Status: " + textStatus+"</h4>"+"<p>"+"Error: " + "Please fill all the required fields with appropriate value" + "</p>" +"<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
                    }
                });
            }
        });

}

export default supportRequest;