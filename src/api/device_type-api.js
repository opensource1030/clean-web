import Vue from "vue";
import $store from "@/store";
import {AuthHelper} from "@/helpers";
const http = Vue.http
var config = require('@/../config/dev.env')
const API_BASE_URL = config.URL_API;

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_devicetypes').then(result => {
      http.get(API_BASE_URL + '/devicetypes', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}