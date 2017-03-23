import Vue from 'vue'
import VueResource from 'vue-resource'

const API_BASE_URL = process.env.URL_API

export default {
  getAll (cb, errCb) {
    Vue.http.get(API_BASE_URL + '/modifications').then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
  Vue.http.post(process.env.URL_API + '/modifications', params).then(res => cb(res), err => errCb(err))
  }
}