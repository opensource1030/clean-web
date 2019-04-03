/*  var $j = require('jquery');

require('foundation-sites')
  require('../modules/classie')



$j.sidebarMenu = function(menu) {
  var animationSpeed = 300;

  $j(menu).on('click', 'li a', function(e) {
    var $jthis = $j(this);
    var checkElement = $jthis.next();

    if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
      checkElement.slideUp(animationSpeed, function() {
        checkElement.removeClass('menu-open');
      });
      checkElement.parent("li").removeClass("active");
    }

    //If the menu is not visible
    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
      //Get the parent menu
      var parent = $jthis.parents('ul').first();
      //Close all open menus within the parent
      var ul = parent.find('ul:visible').slideUp(animationSpeed);
      //Remove the menu-open class from the parent
      ul.removeClass('menu-open');
      //Get the parent li
      var parent_li = $jthis.parent("li");

      //Open the target menu and add the menu-open class
      checkElement.slideDown(animationSpeed, function() {
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
$j(document).foundation();
    $j.sidebarMenu($j('.sidebar-menu'));
    $j('.icon-close').click(function(){
      $j('.menu-left').toggleClass('test');
      $j('.content-right').toggleClass('test')
    });
*/
