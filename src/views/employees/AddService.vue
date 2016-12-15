<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="addService">

        <div class="expanded row">

            <div class="small-12 columns" >

              <ul  class="acordeon" >
                <li class="acordeon-item  is-active" >
                  <a  class="accordion-title"   >Request Service</a>
                  <div class="accordion-content overview"  >
                    <h4>Select Service</h4>
                    <div class="row">
                  <div class="radio">
                          <input type="radio"  value="Red" id="subsidedDevice" required><label for="subsidedDevice">Package for  Company</label>
                          <span  class="sub">ATT</span>
                  </div>
                  <div class="radio">
                          <input type="radio" value="Red" id="payByYourself" required><label for="payByYourself">Packge for Company in Germany</label>
                                  <span class="sub" >Orange</span>
                  </div>
                  <div class="radio">
                          <input type="radio"  value="Red" id="accesories" required><label for="accesories">Package for Frequent Fyers</label>
                                <span class="sub">ATT</span>

                  </div>


                    </div>
                    <div class="row">
                      <div class="small-6 columns">
                        <label class="code" >Preferred code
                          <input type="text" placeholder=""  >

                        </label>

                      </div>




                    </div>
                    <div class="row">
                      <h4>Minutes</h4>
                      <div class="small-5 columns">
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">N/A</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Pooled Domestic Voice Plan</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Unlimited Voice and Messaging Plan (Domestic)</label>


                      </div>
                    </div>
                    <div class="small-1 columns">
                      <div class="radio" >
                      <label class="price" >0.00</label>
                    </div>
                    <div class="radio">
                      <label class="price">30.00</label>
                    </div>
                    <div class="radio" >
                      <label class="price">35.00</label>
                        </div>


                    </div>
                    <div class="small-5 columns">
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Disable International Calls</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Bussiness Global Traveler</label>
                                <span class="subGrey">Reduces the per minute rate for calls originating from outside the U.S</span>


                      </div>

                    </div>
                    <div class="small-1 columns">
                      <div class="radio" >
                        <label class="price">0.00</label>
                          </div>
                          <div class="radio" >
                            <label class="price">5.99</label>
                              </div>

                  </div>

                    </div>
                    <div class="row">
                      <h4>Data</h4>
                      <div class="small-5 columns">
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">2Gb Pooled Domestic Data Plan</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">5Gb Pooled Domestic Data Plan</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Unlimited Domestic and Global Data</label>


                      </div>
                    </div>
                    <div class="small-1 columns">
                      <div class="radio" >
                      <label class="price" >0.00</label>
                    </div>
                    <div class="radio">
                      <label class="price">30.00</label>
                    </div>
                    <div class="radio" >
                      <label class="price">35.00</label>
                        </div>


                    </div>
                    <div class="small-5 columns">
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Disable International Calls</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">120Mb International Add On</label>

                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">300Mb International Add On</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">800Mb International Add On</label>

                      </div>

                    </div>
                    <div class="small-1 columns">
                      <div class="radio" >
                        <label class="price">0.00</label>
                          </div>
                          <div class="radio" >
                            <label class="price">5.99</label>
                              </div>

                  </div>

                    </div>
                    <div class="row">
                      <h4>SMS</h4>
                      <div class="small-5 columns">
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Messaging 200</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Messaging 1000</label>


                      </div>
                      <div class="radio">
                              <input type="radio"  value="Red" id="accesories" required><label for="accesories">Messaging Unlimited</label>


                      </div>
                    </div>
                    <div class="small-1 columns end">
                      <div class="radio" >
                      <label class="price" >5.00</label>
                    </div>
                    <div class="radio">
                      <label class="price">10.00</label>
                    </div>
                    <div class="radio" >
                      <label class="price">20.00</label>
                        </div>


                    </div>

                  </div>

                    </div>







                </li>


              </ul>
        </div>
      </div>
        <a class="button large" @click="save()" id="button">Save Profile</a>
    </div>
  </div>
</div>

</template>
<script src="./AddService.crtl.js" lang="babel"  ></script>
