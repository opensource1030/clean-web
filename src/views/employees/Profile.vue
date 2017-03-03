<template>
      <div id="profile">
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
                                <a class="button expand" @click="updateProfile(1)" id="buttonUpdate">Update Profile</a>
                              <div class="row">
                                <div class="small-3   columns ">
                                  <label >531-242-4212</label>

                                </div>
                                <div class="small-3   columns end">
                                  <label >Austin, HQ</label>

                                </div>

                              </div>
                            </div>

                </li>

                <li class="acordeon-item  " >
                  <a  class="accordion-title"   >My Services</a>
                  <div class="accordion-content" >

        <!--            <div class="row ">
                          <div class="small-3 columns">
                            <div >
                                  <img  class="thumbnail" src="./../../assets/wa-logo.png"  />
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
                              <div class="price">
                          <h6>$64.09 </h6> <label class="monthy"> monthly</label>
                        </div>
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
                    </div>-->
    <!--                <div class="row device">
                          <div class="small-3 columns">
                            <div >
                                  <img  class="thumbnail" src="./../../assets/wa-logo.png" />
</div>
                          </div>
                          <div class="small-3 columns">
                            <div class="row">
                                <h6>Request New service</h6>
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
                                    <div class="price">
                                <h6>$64.09 </h6> <label class="monthy"> monthly</label>
                              </div>
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
                                      <label class="upgrade" >Upgrade will be available in 3 months</label>
                                    </div>
                          </div>
                    </div>-->

                    <div class="row ">
                          <div class="small-3 columns">
                            <div >
                                  <img  class="thumbnail" src="./../../assets/wa-logo.png"  />
              </div>

                          </div>
                          <div class="small-6 columns">
                            <div class="row">
                                <h6>Request New Service</h6>

                            </div>
                            <div class="row">
                          <div class="radio">
                                  <input type="radio" name="service" value="a" id="subsidedDevice" required><label for="subsidedDevice">As a New Service</label>
                                  <span  class="sub">new mobile number</span>
                          </div>
                          <div class="radio">
                                  <input type="radio" name="service" value="b" id="payByYourself" required><label for="payByYourself">Liability Change</label>
                                          <span class="sub" >transfer your presonal-liable mobile numbre to a corporate-liable account keep same carrier</span>
                          </div>
                          <div class="radio">
                                  <input type="radio" name="service" value="R" id="accesories" required><label for="accesories">Line Port + Liability Change</label>
                                        <span class="sub">transfer your personal-liable mobile numbre to a corporate-lable account and switch carriers</span>

                          </div>
                          <div class="radio">
                                  <input type="radio" name="service" value="d" id="customRequest" required><label for="customRequest">Line Port</label>
                                          <span class="sub">switch your corporate-liable mobile number to a different carrier</span>
                          </div>

                            </div>

                          </div>

                          <div class="small-3 columns">
                            <div class="row">
                                  <a class="button expand request"   @click="addService()" >Request Service</a>
                                </div>

                          </div>

                    </div>

                    <div class="row margin">
                          <div class="small-3 columns">
                            <div >
                                  <img  class="thumbnail" src="./../../assets/wa-logo.png"  />
</div>

                          </div>
                          <div class="small-6 columns">
                            <div class="row">
                                <h6>Request New Device</h6>

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
                          <div class="radio">
                                  <input type="radio"  value="Red" id="customRequest" required><label for="customRequest">Custom Request</label>
                                          <span class="sub">something special</span>
                          </div>

                            </div>

                          </div>

                          <div class="small-3 columns">
                            <div class="row">
                                  <a class="button expand request" @click="addDevice()"   v-bind:style="{ backgroundColor: color }" >Request Device</a>
                                </div>

                          </div>

                    </div>

                      </div>

                </li>

              </ul>
        </div>
      </div>

    </div>
  </div>


</template>
<script src="./Profile.crtl.js" lang="babel"  ></script>
