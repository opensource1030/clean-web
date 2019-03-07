<template>
  <div class="app flex-row align-items-center bg-login">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
           <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/wa-logo.png')" alt="Wireless Analytics" />
          </div>
          <div class="mb-3">
            <b-img center height="50" :src="require('./../assets/clean-logo-blue.png')" alt="CLEAN Platform" />
          </div>
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form>
                  <b-row class="mb-2">
                    <b-col cols="12" class="text-center">
                      <p><strong>{{resetPasswordMessage}}</strong></p>
                    </b-col>
                  </b-row>
                 <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Enter your password" autocomplete="Enter your password" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Reprat the password" autocomplete="Reprat your password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6">
                        <b-form-checkbox
                        id="checkbox1"
                        v-model="status"
                        value="accepted"
                        unchecked-value="not_accepted"
                        >
                        show passwords
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <p>
                      {{message}}
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" class="px-4 w-100">{{sendRequest}}</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
        
        sendRequest: 'change my password',
        resetPasswordMessage: 'Change your password below.',
        message: 'Here you can reset your password, if it is not valid, you should see an error, if it is correct, you will be redirected to the Login Page.'

    }
  }
}
</script>

<style lang="scss">
</style>
