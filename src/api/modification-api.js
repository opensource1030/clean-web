import { http } from 'vue'
import $store from './../store'
import { AuthHelper } from './../helpers'

const API_BASE_URL = process.env.URL_API

export default {

  getAll (cb, errCb) {
    http.get(process.env.URL_API + '/modifications', params).then((response) => {
      let i = response.data.meta.pagination.current_page;
      while (i <= response.data.meta.pagination.total_pages) {

        let params2 = {
          params: {
            page: i
          }
        };

        http.get(process.env.URL_API + '/modifications', params2).then((res) => {
          cb(res)
        }, (err) => {
          errCb(err)
        });

        i++;
      }
    }, (response) => {});
  },

  search (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_modifications').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/modifications', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'create_modification').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.post(API_BASE_URL + '/modifications', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
