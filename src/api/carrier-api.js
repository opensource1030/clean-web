import Vue from 'vue'
import $store from '@/store'
import { AuthHelper } from '@/helpers'

const http = Vue.http
const API_BASE_URL = process.env.URL_API

export default {

  searchQuery (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_carriers').then(result => {
      http.get(API_BASE_URL + '/carriers?filter' + params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res.data), err => errCb(err))
    }, err => errCb(err))
  },

  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_carriers').then(result => {
      http.get(API_BASE_URL + '/carriers', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
