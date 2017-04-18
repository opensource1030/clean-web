<template>
    <section class="menu-left ">
        <ul id="menu" class="sidebar-menu">
            <li class="menu-toggle">
                <a class="icon-close"><i class="fa fa-bars"></i></a>
            </li>
            <li class="menu-title">
                <a href="/dashboard">
                    <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                </a>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-bar-chart"></i>
                    <span>Reports</span>
                    <i class="fa fa-plus pull-right"></i>
                    <i class="fa fa-minus pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_trend.asp?access_token="><i
                            class="fa fa-circle-o"></i> Trends</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_cycle.asp?access_token="><i
                            class="fa fa-circle-o"></i> Bill Cycle</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/dashboard_top_ten.asp?access_token="><i
                            class="fa fa-circle-o"></i> Top 10 Reports</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_allocation.asp?access_token="><i
                            class="fa fa-circle-o"></i> Charge</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_data.asp?access_token="><i
                            class="fa fa-circle-o"></i> Data</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_international.asp?access_token="><i
                            class="fa fa-circle-o"></i> International</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_usage.asp?access_token="><i
                            class="fa fa-circle-o"></i> Usage</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_ap.asp?access_token="><i
                            class="fa fa-circle-o"></i> Intercompany Charge</a></li>
                    <li class="redirect-link"><a target="_blank"
                                                 href="http://app.wirelessanalytics.com/helpdesk/udl/report_zero_usage.asp?access_token="><i
                            class="fa fa-circle-o"></i> Zero Usage</a></li>
                </ul>
            </li>
            <li>
                <router-link :to="{ name: 'legacyInfo'}">
                    <i class="fa fa-phone"></i> <span>Support</span>
                </router-link>


            </li>

        </ul>

        <div class="nav-poweredby">
            <span class="text-copyright">Powered By</span>
            <img class="img-full" src="./../assets/wa-logo.png" alt="Wireless Analytics">
            <img class="img-collapse" src="./../assets/logo.png" alt="Wireless Analytics">
        </div>
    </section>
</template>

<script>
    import Permision from './permisions'
    import Vue from 'vue';
    Vue.directive('permission', {
        update: function (el, value) {
            if (Permision.hasPerm(value) == false) {
                el.style.display = 'none'
            }
            else {
                el.style.display = 'block';
            }
        }
    })
    export default {
        name: "Sidemenu",
        data() {
            return {
                features: features
            }
        },
        mounted() {
            /*console.log('features', this.features);*/
            var intervalId = setInterval(function () {
                var token = localStorage.token;
                var id = localStorage.userId;
                var email = localStorage.email;
                $('.redirect-link a').attr('href', function (index, href) {
                    var param = token + '&email=' + email;
                    if (href.charAt(href.length - 1) === '?') //Very unlikely
                        return href + param;
                    else if (href.indexOf('?') > 0)
                        return href + param;
                    else
                        return href + '?' + param;
                });
                if (token !== undefined) {
                    clearInterval(intervalId);
                }
            }, 2000);
            $.sidebarMenu = function (menu) {
                var animationSpeed = 300;
                $(menu).on('click', 'li a', function (e) {
                    var $this = $(this);
                    var checkElement = $this.next();
                    if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
                        checkElement.slideUp(animationSpeed, function () {
                            checkElement.removeClass('menu-open');
                        });
                        checkElement.parent("li").removeClass("active");
                    }
                    //If the menu is not visible
                    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                        //Get the parent menu
                        var parent = $this.parents('ul').first();
                        //Close all open menus within the parent
                        var ul = parent.find('ul:visible').slideUp(animationSpeed);
                        //Remove the menu-open class from the parent
                        ul.removeClass('menu-open');
                        //Get the parent li
                        var parent_li = $this.parent("li");
                        //Open the target menu and add the menu-open class
                        checkElement.slideDown(animationSpeed, function () {
                            //Add the class active to the parent li
                            checkElement.addClass('menu-open');
                            parent.find('li.active').removeClass('active');
                            parent_li.addClass('active');
                        });
                    }
                    //if this isn't a link, prevent the page from being redirected
                    if (checkElement.is('.treeview-menu')) {
                        e.preventDefault();
                    }
                });
            }
            $(this.$el).foundation();
            $.sidebarMenu($('.sidebar-menu'));
           /* $.cookie("isMenuActive", "1");*/
            if ($.cookie("isMenuActive") == 1) {
                $('.menu-left').addClass("test");
                $('.content-right').addClass("test");
            }
            $(".icon-close").click(function () {
                if ($(".menu-left").hasClass("test") == true) {
                    //button was active, de-activate it and update cookie
                    $(".menu-left").removeClass("test");
                    $(".content-right").removeClass("test");
                    $.cookie("isMenuActive", "0");
                }
                else {
                    //button is not active. add active class and update cookie.
                    $(".menu-left").addClass("test");
                     $(".content-right").addClass("test");
                    $.cookie("isMenuActive", "1");
                }
            });
            $('#menu').slicknav({prependTo: 'section.top-bar-section'});
        },
    }
</script>

