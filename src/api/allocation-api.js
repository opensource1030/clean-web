import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_allocations').then(result => {
      http.get(API_BASE_URL + '/allocations', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_allocation').then(result => {
      http.get(API_BASE_URL + '/allocations/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },


}
