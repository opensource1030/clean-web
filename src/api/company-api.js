import Vue from 'vue'
import VueResource from 'vue-resource'

const API_BASE_URL = process.env.URL_API

export default {
  getAll (params, cb, errCb) {
    Vue.http.get(API_BASE_URL + '/companies', params).then(res => cb(res), err => errCb(err))
  },
}