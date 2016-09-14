<template>
<div class="content-right" >
  <div class="full-height row">
  <div id="device">
<div class="header"></div>


     <div class="small-12 columns titles" >
      <h4>Manage Devices<h4>
        </div>

          <div class="medium-6 columns">
            <label>Title
              <input type="text" placeholder="">
            </label>
          </div>



  <div class="small-12 columns" >
    <h2>Accordion with symbols</h2>
  <p>In this example we have added a "plus" sign to each button. When the user clicks on the button, the "plus" sign is replaced with a "minus" sign.</p>
  <button class="accordion">Section 1</button>
  <div class="panel">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>

  <button class="accordion">Section 2</button>
  <div class="panel">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>

  <button class="accordion">Section 3</button>
  <div id="foo" class="panel">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</div>
</div>

</template>
<script>


export default {
    name: "Device",

    created(){


    },

    ready(){

      var acc = document.getElementsByClassName("accordion");
          var i;

          for (i = 0; i < acc.length; i++) {
              acc[i].onclick = function(){
                  this.classList.toggle("active");
                    this.nextElementSibling.classList.toggle("show");
                    }
                  }

    },
    methods: {

    },


    data() {

      return {


      }
    }


}


</script>
