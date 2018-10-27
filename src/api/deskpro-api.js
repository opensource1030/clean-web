import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'search_deskpro').then(result => {
      http.get(API_BASE_URL + '/deskpro', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res.body), err => errCb(err))
    }, err => errCb(err))
  },
}
