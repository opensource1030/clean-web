import { http } from 'vue'
import $store from './../store'
import { AuthHelper } from './../helpers'

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_companies').then(result => {
      http.get(API_BASE_URL + '/companies', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_company').then(result => {
      http.get(API_BASE_URL + '/companies/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_company').then(result => {
      http.post(API_BASE_URL + '/companies', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_company').then(result => {
      http.patch(API_BASE_URL + '/companies/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    $store.dispatch('scope_token/get', 'delete_company').then(result => {
      http.delete(API_BASE_URL + '/companies/' + id, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(errCb))
    }, err => errCb(err))
  },

  jobs (id, form, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_company_job').then(result => {
      http.post(API_BASE_URL + '/companies/' + id + '/jobs', form, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  updateJobs (compnay_id, job_id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'update_company_job').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.patch(API_BASE_URL + '/companies/' + compnay_id + '/jobs/' + job_id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  getJobs (compnay_id, job_id, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_company_job').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/companies/' + compnay_id + '/jobs/' + job_id).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}