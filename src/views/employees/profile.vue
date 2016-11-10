<template>

  <div class="content-right">
    <div class="full-height row">
      <div id="updateEmployee">

        <div class="expanded row">

            <div class="small-12 columns" >

              <ul  class="acordeon" >
                <li class="acordeon-item  is-active" >
                  <a  class="accordion-title"   >Personal Information</a>
                  <div class="accordion-content overview"  >
                    <div class="row">

                      <div class="small-3   columns ">
                        <label style="font-weight:bold">John Stewart</label>

                      </div>
                              </div>
                              <div class="row">
                                <div class="small-3   columns ">
                                  <label >Senior Java Developer</label>

                                </div>
                                <div class="small-3   columns  end">
                                  <label >R&D 1110</label>

                                </div>

                              </div>
                              <div class="row">
                                <div class="small-3   columns ">
                                  <label >John.stewart@company.com</label>

                                </div>
                                <div class="small-3   columns end">
                                  <label >Pete.johnson@comany.com@company.com</label>

                                </div>


                              </div>
                                <a class="button expand" @click="save()" id="buttonUpdate">Update Profile</a>
                              <div class="row">
                                <div class="small-3   columns ">
                                  <label >531-242-4212</label>

                                </div>
                                <div class="small-3   columns end">
                                  <label >Austin, HQ</label>

                                </div>

                              </div>

                </li>

                <li class="acordeon-item  " >
                  <a  class="accordion-title"   >My Services</a>
                  <div class="accordion-content" >

                    <div class="row">
                          <div class="small-3 columns">
                            <div >
                                  <img   src="./../../assets/wa-logo.png" aria-hidden=true alt="Photo Iphone 6" width="200px" height="800px" class="custom-thumbnail-class" />
</div>

                          </div>
                          <div class="small-3 columns">
                            <div class="row">
                                <h6>AT&T</h6>

                            </div>
                            <div class="row">
                            <ul>
                              <li><label>pooled Domestic Voice Plan</label></li>
                                <li><label>pooled Domestic Voice Plan</label></li>
                                  <li><label>pooled Domestic Voice Plan</label></li>
                              <ul>
                            </div>


                          </div>
                          <div class="small-3 columns">
                            <div class="row">

                                <h6>$64.09 </h6> <label> monthly</label>

                            </div>
                            <div class="row">
                            <ul>
                              <li><label>30.00</label></li>
                                <li><label>5.99</label></li>
                                  <li><label>23.10</label></li>
                              <ul>
                            </div>




                          </div>
                          <div class="small-3 columns">
                                  <a class="button expand" @click="save()" >Change Services</a>
                          </div>


                    </div>
                    <div class="row">
                          <div class="small-3 columns">
                            <div >
                                  <img   src="./../../assets/wa-logo.png" aria-hidden=true alt="Photo Iphone 6" width="200px" height="800px" class="custom-thumbnail-class" />
</div>

                          </div>
                          <div class="small-3 columns">
                            <div class="row">
                                <h6>AT&T</h6>

                            </div>
                            <div class="row">
                            <ul>
                              <li><label>pooled Domestic Voice Plan</label></li>
                                <li><label>pooled Domestic Voice Plan</label></li>
                                  <li><label>pooled Domestic Voice Plan</label></li>
                              <ul>
                            </div>


                          </div>
                          <div class="small-3 columns">
                            <div class="row">

                                <h6>$64.09 </h6> <label> monthly</label>

                            </div>
                            <div class="row">
                            <ul>
                              <li><label>30.00</label></li>
                                <li><label>5.99</label></li>
                                  <li><label>23.10</label></li>
                              <ul>
                            </div>




                          </div>
                          <div class="small-3 columns">
                            <div class="row">
                                  <a class="button expand" @click="save()" >Repair Device</a>
                                </div>
                                <div class="row">
                                      <a class="button expand" @click="save()" >Upgrade Device</a>
                                      <label>Upgrade will be available in 3 months</label>
                                    </div>


                          </div>



                    </div>
                    <div class="row">
                          <div class="small-3 columns">
                            <div >
                                  <img   src="./../../assets/wa-logo.png" aria-hidden=true alt="Photo Iphone 6" width="200px" height="800px" class="custom-thumbnail-class" />
</div>

                          </div>
                          <div class="small-3 columns">
                            <div class="row">
                                <h6>AT&T</h6>

                            </div>
                            <div class="row">
                          <div class="radio">
                                  <input type="radio"  value="Red" id="subsidedDevice" required><label for="subsidedDevice">Subsided Device</label>
                                  <span  class="sub">choose a device from a list</span>
                          </div>
                          <div class="radio">
                                  <input type="radio" value="Red" id="payByYourself" required><label for="payByYourself">Pay by Yourself</label>
                                          <span class="sub" >choose any device and pay by yourself</span>
                          </div>
                          <div class="radio">
                                  <input type="radio"  value="Red" id="accesories" required><label for="accesories">Accesories</label>
                                        <span class="sub">headphones,chargers,bags</span>

                          </div>

                            </div>
                            <div class="radio">
                                    <input type="radio"  value="Red" id="customRequest" required><label for="customRequest">Custom Request</label>
                                            <span class="sub">something special</span>
                            </div>



                          </div>

                          <div class="small-3 columns">
                            <div class="row">
                                  <a class="button expand" @click="save()" >Request Device</a>
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
<script src="./Profile.crtl.js" lang="babel"  ></script>
