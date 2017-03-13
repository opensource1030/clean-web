
<template>
 <div>
     <div id="morphsearch" class="morphsearch" v-on:click="greet">
         <form class="morphsearch-form">
      <input class="morphsearch-input" type="search" placeholder="What can we help you with?" title="What can we help you with?"/>
      <button class="morphsearch-submit" type="submit">Search</button>
    </form>
         <div class="morphsearch-content">
      <!-- Helpjuice Knowledge base code -->
      <div id="knowledge-base-content">
        <iframe id="helpdocs" src="https://clean.helpdocs.com/"> </iframe>
      </div>
      <!-- End of  knowledge base code -->
    </div><!-- /morphsearch-content -->
    <span class="morphsearch-close"></span>
  </div>
</div><!-- /morphsearch -->
</template>
<script>
/*import auth from './../api/auth'*/
var classie = require('../modules/classie');
var Analytics = require('analytics-node');
const analytics = new Analytics('Dy0QNnCp8KikotmDFBXziH1LqHtSVpVt');
const gaId = 'UA-42900219-2';
export default {
    name: "Morphsearch",
  mounted(){
    (function() {
        $("#helpdocs", window.parent.document).height($("body").height() + 0);
        if ($('body').width() < 768) $('input.morphsearch-input').attr('placeholder', 'Need help?');
        $(window).resize(function(){
            $("#helpdocs", window.parent.document).height($("body").height() + 0);
            if ($('body').width() < 768) $('input.morphsearch-input').attr('placeholder', 'Need help?');
        });
      var isAnimating;
      var morphSearch = document.getElementById( 'morphsearch' ),
              input = morphSearch.querySelector( 'input.morphsearch-input' ),
              ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
              isOpen = isAnimating = false,
              // show/hide search area
              toggleSearch = function(evt) {
                // return if open and the input gets focused
                if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

                var offsets = morphsearch.getBoundingClientRect();
                if( isOpen ) {

                  classie.remove( morphSearch, 'open' );


                  // trick to hide input text once the search overlay closes
                  // todo: hardcoded times, should be done after transition ends
                  if( input.value !== '' ) {
                    setTimeout(function() {
                      classie.add( morphSearch, 'hideInput' );
                      setTimeout(function() {
                        classie.remove( morphSearch, 'hideInput' );
                        input.value = '';
                      }, 300 );
                    }, 500);
                  }

                  input.blur();
                }
                else {

                  classie.add( morphSearch, 'open' );


                }
                isOpen = !isOpen;
                  document.getElementById('helpdocs').src = document.getElementById('helpdocs').src;


              };

      // events
      input.addEventListener( 'focus', toggleSearch );
      ctrlClose.addEventListener( 'click', toggleSearch );
      // esc key closes search overlay
      // keyboard navigation events
      document.addEventListener( 'keydown', function( ev ) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 && isOpen ) {
          toggleSearch(ev);
        }
      } );


      /***** for demo purposes only: don't allow to submit the form *****/
      morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
    })();
  },
    methods: {
        greet() {
            this.$ga.trackEvent('Knowledge Based explored')
        }
    }
}
</script>
