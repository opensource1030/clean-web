<template>
  <div class="content-right">
    <div class="full-height row">
      <div id="addDevice">
        <div class="expanded row">
          <div class="small-12 columns">
            <ul class="acordeon">
              <li class="acordeon-item  is-active">
                <a class="accordion-title">Request Device</a>
                <div class="accordion-content overview">
                  <h4>Select Device</h4>
                  <div class="row">
                    <div class="small-2 columns">
                      <img class="thumbnail"  src="./../../assets/wa-logo.png"/>
                    </div>
                    <div class="small-6 columns end">
                      <h8>Iphone 6,Space Grey,128 Gb</h8>
                      <label></label>
                    </div>
                  </div>
                  <div class="row">
                    <label class="price">$399.00</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <a class="button large" @click="save()" id="button">Save Profile</a>
    </div>
  </div>
</template>
<script src="./AddDevice.crtl.js" lang="babel"></script>
