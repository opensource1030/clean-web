import Vue from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";
const http = Vue.http

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_locations').then(result => {
      http.get(API_BASE_URL + '/locations', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
