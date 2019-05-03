import Vue from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";
const http = Vue.http
var config = require('@/../config/dev.env')
const API_BASE_URL = config.URL_API

export default {
  // getAll (cb, errCb) {
  //   http.get(API_BASE_URL + '/modifications', params).then((response) => {
  //     let i = response.data.meta.pagination.current_page;
  //     while (i <= response.data.meta.pagination.total_pages) {
  //       let params2 = {
  //         params: {
  //           page: i
  //         }
  //       };
  //       http.get(API_BASE_URL + '/modifications', params2).then((res) => {
  //         cb(res)
  //       }, (err) => {
  //         errCb(err)
  //       });
  //       i++;
  //     }
  //   }, (response) => {});
  // },

  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_modifications').then(result => {
      http.get(API_BASE_URL + '/modifications', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_modification').then(result => {
      http.post(API_BASE_URL + '/modifications', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
