import Vue from 'vue'
import VueResource from 'vue-resource'

const API_BASE_URL = process.env.URL_API

export default {
  create (form, cb, errCb) {
    Vue.http.post(API_BASE_URL + '/images', form).then(res => cb(res), err => errCb(err))
  },
}