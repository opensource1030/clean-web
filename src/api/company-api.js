import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

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

  getJobs (compnay_id, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_jobs_company').then(result => {
      http.get(API_BASE_URL + '/companies/' + compnay_id + '/jobs', AuthHelper.setAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  getJob (compnay_id, job_id, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_company_job').then(result => {
      http.get(API_BASE_URL + '/companies/' + compnay_id + '/jobs/' + job_id, AuthHelper.setAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  createJob (company_id, form, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_company_job').then(result => {
      http.post(API_BASE_URL + '/companies/' + company_id + '/jobs', form, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  updateJob (compnay_id, job_id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_company_job').then(result => {
      http.patch(API_BASE_URL + '/companies/' + compnay_id + '/jobs/' + job_id, params, AuthHelper.setAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}