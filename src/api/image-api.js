import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  create (form, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_image').then(result => {
      http.post(API_BASE_URL + '/images', form, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}