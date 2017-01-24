import auth from './../api/auth'
var {Store} = require('yayson')()
var    store = new Store()
export default {
    name: "SpentInfo",
    created(){
        this.$http.get(process.env.URL_API+'/users/'+localStorage.userId).then((response) => {
            var event = store.sync(response.data);
            this.userInfo= event;
        }, (response) => {

        });
        this.$http.get(process.env.URL_API+'/allocations/'+this.$route.params.id).then((response) => {
            var event = store.sync(response.data);
            this.allocation= event;
        }, (response) => {

        });

    },
    mounted () {
        $('.has-tip').foundation();
        var user = {};
        $.ajax({
            type: 'GET',
            url: process.env.URL_API + '/users/' + localStorage.userId + '?users',
            success: function (data) {
                return user = {
                    "email": data.data.attributes.email,
                    "firstName": data.data.attributes.firstName,
                    "lastName": data.data.attributes.lastName
                }
            }
        });
        var $select = $('#support-form .user-actions');
        $select.on('change', function () {
            var value = '.' + $(this).val();

        });

        var $selectOption = $('.user-actions');
        $selectOption.on('change', function () {
            var value1 = $(this).val();
            $('.btn-provision').click();
            $select.prop('value', value1);
        });

        $('.btn-provision').click(function () {
            $('#recipient_email').val(user.email);
            $('#recipient_firstname').val(user.firstName);
            $('#recipient_lastName').val(user.lastName);
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
                var company = "wirelessanalytics";
                var key = "PMf04HTtZ7dNDIS2gmQCUWWRw0IwaHvdoa3MYQ6Fg6f23s8zrr";
                var json = {
                    "assignedTo":59063,
                    "inboxId":1778,
                    "subject": $('#subject').val(),
                    "customerEmail": $('#recipient_email').val(),
                    "customerMobileNumber" : $('#recipient_mobilenumber').val(),
                    "customerPhoneNumber" : $('#recipient_phonenumber').val(),
                    "message":$('#description').val() + ' ' + ' Preferred:'+ ' ' + $('input[name=method]:checked', '#support-form').val(),
                    "source": "clean-dashboard",
                    "status" : "active",
                    "tags[]" : $('#tags').val(),
                    "priority" : $('input[name=priority]:checked', '#support-form').val()
                };
                $.ajax({
                    type: "POST",
                    url: "https://" + company + ".teamwork.com/desk/v1/tickets.json",
                    headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
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
    },
    computed:{
        fullName : function () {
            return this.userInfo.firstName + " " + this.userInfo.lastName
        }

    },
    data(){
        return {
            userInfo: {},
            allocation : {},
            isActive: true,
            viewText : 'All',
            popOver : true,
        }
    },
    methods:{
        viewToggle(){
            var el = document.querySelector('.list-striped');
            el.classList.toggle('all');
            return this.active ? 'You like this' : 'Like this not'
        },
        fetchData(){

        }
    }
}
