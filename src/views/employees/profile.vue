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
