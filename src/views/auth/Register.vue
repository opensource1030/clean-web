<template>
  <div class="page auth-page flex-row align-items-center bg-primary">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col lg="5">
          <div class="mb-3">
            <b-img center height="50" :src="require('@/assets/images/wa-logo.png')" alt="Wireless Analytics" />
          </div>
          <b-card-group>
            <b-card no-body>
              <b-card-body>
                <b-form>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="credentials.firstName" placeholder="First Name" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="credentials.lastName" placeholder="Last Name" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="credentials.email" placeholder="email" disabled/>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-if="!passwordType" type="password" class="form-control" v-model="credentials.password1" placeholder="Enter your password" autocomplete="Enter your password" />
                    <b-form-input v-else type="text" class="form-control" v-model="credentials.password1" placeholder="Enter your password" autocomplete="Enter your password" />
                  
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-if="!passwordType" type="password" class="form-control" v-model="credentials.password2" placeholder="Reprat your password" autocomplete="Reprat your password" />                    
                    <b-form-input v-else type="text" class="form-control" v-model="credentials.password2" placeholder="Reprat your password" autocomplete="Reprat your password" />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col cols="6">
                        <b-form-checkbox
                        id="checkbox1"
                        value="accepted"
                        v-model="passwordType"
                        style="color: black;"
                        >
                        show passwords
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-alert show variant="danger" v-show="$store.getters['error/hasError']">{{ $store.getters['error/error'] }}</b-alert>
                  <b-alert show variant="success" v-show="variations.messageShow">{{ variations.message }}</b-alert>
                  <b-row>
                    <b-col cols="12">
                      <b-button variant="primary" class="px-4 w-100" @click="submit()">Register New User</b-button>
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
import { mapGetters } from 'vuex';

export default {
  name: 'register',

  data() {
    return {
      credentials: {
        firstName: '',
        lastName: '',
        email: this.$route.params.email,
        password1: '',
        password2: '',
      },
      passwordType: false,
      newPassword: 'Enter your password',
      repeatPassword: 'Repeat your password',
      buttonMessage: 'Register New User',
    }
  },

  computed: {
    ...mapGetters({
      variations: 'auth/getVariations',
    })
  },

  methods: {
    submit() {
      if (this.variations.clickAgain) {
        this.$store.dispatch('error/clearAll');
        this.$store.dispatch('auth/register', {
          credentials: this.credentials
        })
      }
    }
  },

  beforeCreate() {
    this.$store.commit('auth/recoveryVariations');
  },
}
</script>
