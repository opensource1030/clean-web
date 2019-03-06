<template>
  <div class="app flex-row align-items-center bg-login">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <div>
            <b-img center :src="require('./../assets/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" class="px-4 w-100">Sign In</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
          <div class="powered-by">
            <span class="align-middle">Powered By</span>
            <img src="./../assets/wa-logo.png" alt="Wireless Analytics">
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

//<b-img center :src="require('./../assets/wa-logo.png')" alt="CLEAN Platform" />
export default {
  name: 'Login'
}
</script>

<style lang="scss">
.powered-by{
  max-width: 210px;
  margin: 3rem auto 0;
  overflow: hidden;
  span{
    float: left;
    line-height:2rem;
    font-size: 0.82rem;
  }
  img{
    float: right;
    max-width: 130px;
    border-left:1px solid lighten(black,45%);
    padding-left: 0.5rem ;
  }

  .bg-login{
    background: #066199;
  }

}
</style>
