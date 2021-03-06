import _ from 'lodash'
import authAPI from '@/api/auth-api'
import employeeAPI from '@/api/employee-api'
import companyAPI from '@/api/company-api'
import * as types from './../mutation-types'
import user from '@/models/User'
import { Storage, Utils } from '@/helpers'

const { Store } = require('yayson')()
const store = new Store()

analytics.identify(process.env.ANALYTICS_ID)

// initial state
const state = {
  userId: Storage.get('userId') || null,
  token: Utils.parseJsonString(Storage.get('token')),
  // profile: Utils.parseJsonString(Storage.get('profile')),
  profile: {},
  company: {},
  company_loading: true,
  allowedDomains: [],
  userInfo: {
    data: {},
    lastAllocations: [],
    loading: true,
  },
  show_ticket: false,
  ticket_issue: '',
  isAuthenticating: false,
  variations: {
    clickAgain: true,
    allowChanges: true,
    messageShow: true,
    message: '',
  },
  warningPopupFlag: false,
}

// Prepare the Model
// getters
const getters = {
  isAuthenticated: state => {
    // console.log('isAuthenticated ...', state.userId, state.token)
    return !(Utils.isEmptyObject(state.token) || Utils.isEmpty(state.token.access_token) || Utils.isEmpty(state.userId) || state.isAuthenticating)
  },

  isExpired: state => {
    let status = false
    if (state.token) {
      status = Date.now() > state.token.updated_at + state.token.expires_in
    }
    return status
  },

  getProfile: state => {
    return state.profile
  },

  getVariations: state => {
    return state.variations
  },

  getClientInfo: state => {
    return {
      data: state.company.object,
      loading: state.company_loading,
    }
  },

  getRole: state => _.get(state.profile, 'roles[0].name', 'user'),

  getPermissions: state => {
    // return _.get(state.profile, 'roles[0].permissions', {})
    return _.map(_.get(state.profile, 'roles[0].permissions', {}), 'name')
  },

  getUdls: state => {
    return _.get(state.profile, 'companies.0.udls', [])
  },

  getWarningPopupFlag: state => {
    return state.warningPopupFlag
  },

  getAllowedDomains: state => {
    return state.allowedDomains
  },
}

// actions
const actions = {
  getTheModel({ dispatch, commit, state }, { credentials }) {
    return new user(
      'users',
      0,
      '',
      '',
      credentials.email,
      '',
      credentials.password1,
      '',
      '',
      '',
      '',
      credentials.firstName,
      credentials.lastName,
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    )
  },

  getLoginToken({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let updated_at = new Date().getTime() - 4000 // Set token as expired by default
      if (state.token && state.token.updated_at) {
        // Get updated_at if set
        updated_at = state.token.updated_at
      }
      let current_time = new Date().getTime()
      let passed = Math.abs(updated_at - current_time) / 1000
      // let expires_in = state.token.expires_in
      let expires_in = 3600

      if (passed < expires_in) {
        // console.log('saved token', state.token)
        resolve(state.token)
      } else {
        let _params = {
          grant_type: 'refresh_token',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: state.token.refresh_token,
        }

        authAPI.refreshLoginToken(
          _params,
          res => {
            commit(types.AUTH_REFRESH_TOKEN, res)
            // console.log('refresh token', state.token)
            resolve(state.token)
          },
          err => {
            reject(err)
          },
        )
      }
    })
  },

  profile({ dispatch, commit, state }, { res, router, returnUrl }) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'roles.permissions.scopes,companies.contents,udlvalues,companies,companies.udls,companies.udls.udlvalues',
        },
      }

      authAPI.profile(
        _params,
        response => {
          let current_time = new Date().getTime()
          let result = {
            user_id: res.data.user_id,
            token: _.extend({ created_at: current_time, updated_at: current_time }, res.data),
            profile: response,
          }

          commit(types.AUTH_LOGIN_SUCCESS, result)

          if (returnUrl) {
            location.href = returnUrl + '?jwt=' + response.deskproJwt
          } else {
            commit(types.AUTH_LOGIN_DONE)

            // // Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
            router.push({ name: 'Dashboard' })
            resolve(result)
          }
        },
        error => {
          commit(types.AUTH_LOGIN_FAILURE)
          dispatch(
            'error/addNew',
            {
              message: 'Unexpected server error. Please contact the administrator.',
            },
            { root: true },
          )
          reject(error)
        },
      )
    })
  },

  updateProfile({ dispatch, state }, data) {
    let udlData = []

    _.keys(data.udlvalues).forEach(key => {
      if (data.udlvalues[key]) {
        // udlData.push({ udlName: key, udlValue: data.udlvalues[key] })
        udlData.push({
          type: 'udlvalues',
          id: data.udlvalues[key],
        })
      }
    })

    const payload = {
      data: {
        type: 'users',
        attributes: _.omit(data, 'udlvalues'),
        relationships: {
          udlvalues: {
            data: udlData,
          },
        },
      },
    }

    return new Promise((resolve, reject) => {
      employeeAPI.update(
        state.userId,
        payload,
        () => {
          dispatch('getProfileAfterUpdate').then(res => resolve(res), err => reject(err))
        },
        err => {
          reject(err)
        },
      )
    })
  },

  getProfileAfterUpdate({ commit }) {
    const profilePayload = {
      params: {
        include: 'roles.permissions.scopes,companies.contents,companies.udls,companies.udls.udlvalues,udlvalues',
      },
    }

    return new Promise((resolve, reject) => {
      authAPI.profile(
        profilePayload,
        profile => {
          commit(types.AUTH_SET_PROFILE, profile)
          resolve(profile)
        },
        error => reject(error),
      )
    })
  },

  getProfile({ dispatch, state }) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(state.profile)) {
        dispatch('getProfileAfterUpdate').then(res => resolve(res), err => reject(err))
      } else {
        resolve(state.profile)
      }
    })
  },

  loadCompany({ commit }, company_url) {
    authAPI.getCompany(
      company_url,
      response => {
        // console.log('auth/loadCompany', company_url, response.body)
        commit('setCompany', response.body)
        commit('setCompanyLoading', false)
      },
      error => {
        commit('setCompanyLoading', false)
      },
    )
  },

  loadUserInfo({ commit }) {
    let userInfo = {
      data: {},
      lastAllocations: [],
      loading: true,
    }

    let _params = {
      params: {
        include: 'companies.currentBillMonths,allocations',
        'filter[allocations.billMonth]': '[companies.currentBillMonths.last:3]',
      },
    }

    return new Promise((resolve, reject) => {
      employeeAPI.get(
        state.userId,
        _params,
        res => {
          // console.log('auth/loadUserInfo', res);
          if (res.status == 404) {
            userInfo.data.allocations = []
            userInfo.lastAllocations = []
          } else {
            let event = store.sync(res.data)
            userInfo.data = event

            for (let allocation of userInfo.data.allocations) {
              allocation.issue = ''
            }

            let lastAllocations = []
            let allocationsByPhone = _.groupBy(userInfo.data.allocations, 'mobile_number')
            _.forEach(allocationsByPhone, function(allocations) {
              lastAllocations.push(_.orderBy(allocations, ['bill_month'], ['desc'])[0])
            })
            userInfo.lastAllocations = lastAllocations
          }
          userInfo.loading = false

          commit('setUserInfo', userInfo)
          resolve(userInfo)
        },
        err => {
          // console.log('auth/loadUserInfo err', err);
          userInfo.data = state.profile
          userInfo.data.allocations = []
          userInfo.loading = false

          commit('setUserInfo', userInfo)
          reject(err)
        },
      )
    })
  },

  // setShowTicket({ commit }, show_ticket) {
  //   commit('setShowTicket', show_ticket)
  // },

  // setTicketIssue({ commit }, ticket_issue) {
  //   commit('setTicketIssue', ticket_issue)
  // },

  checkIfThePasswordIsStrongEnough({ dispatch, commit, state }, { password1, password2 }) {
    if (password1 == '' || password2 == '') {
      return 'The Passwords must not be empty, please, fill it properly.'
    }

    if (password1 != password2) {
      return 'The Passwords must be equals, please, fill it properly.'
    }

    if (password1.length < 6) {
      return 'Password must contain at least six characters!'
    }

    let re = /[0-9]/
    if (!re.test(password1)) {
      return 'Password must contain at least one number (0-9)!'
    }

    re = /[a-z]/
    if (!re.test(password1)) {
      return 'Password must contain at least one lowercase letter (a-z)!'
    }

    re = /[A-Z]/
    if (!re.test(password1)) {
      return 'Password must contain at least one uppercase letter (A-Z)!'
    }

    return ''
  },

  resetPasswords({ dispatch, rootGetters, commit, state }, { router, credentials }) {
    commit('RECOVERY_VARIATIONS')
    dispatch('checkIfThePasswordIsStrongEnough', {
      password1: credentials.password1,
      password2: credentials.password2,
    }).then(response => {
      if (response != '') {
        dispatch(
          'error/addNew',
          {
            message: response,
          },
          { root: true },
        )
      }

      if (rootGetters['error/hasError']) {
        commit('REGISTER_FAILURE')
      } else {
        let params = {
          params: {
            password1: credentials.password1,
            password2: credentials.password2,
          },
        }

        return new Promise((resolve, reject) => {
          authAPI.resetPasswords(
            credentials.identification,
            credentials.code,
            params,
            res => {
              router.push({ name: 'login' })
              resolve(res)
            },
            err => {
              if (err.data.message == 'different identifications') {
                dispatch(
                  'error/addNew',
                  {
                    message: 'The link has been expired, please, return to the forgot password and retrieve another one.',
                  },
                  { root: true },
                )
              }

              if (err.data.message == 'different codes') {
                dispatch(
                  'error/addNew',
                  {
                    message: 'The link has been expired, please, return to the forgot password and retrieve another one.',
                  },
                  { root: true },
                )
              }

              if (err.data.message == 'user not found') {
                dispatch(
                  'error/addNew',
                  {
                    message: 'The credentials has not any user associated, please, return to the forgot password and retrieve another one.',
                  },
                  { root: true },
                )
              }

              if (err.data.message == 'different passwords') {
                dispatch(
                  'error/addNew',
                  {
                    message: 'The password fields must be equal and not empty, please, try again.',
                  },
                  { root: true },
                )
              }

              if (err.status == 500) {
                dispatch(
                  'error/addNew',
                  {
                    message: 'Unexpected error, please, try again later.',
                  },
                  { root: true },
                )
              }

              //commit('REGISTER_FAILURE')
              if (err.status == 409) {
                dispatch(
                  'error/addNew',
                  {
                    message: err.body.errors.users,
                  },
                  { root: true },
                )
              } else {
                dispatch(
                  'error/addNew',
                  {
                    message: 'Unexpected error. Please, try again later.',
                  },
                  { root: true },
                )
              }
              reject(err)
            },
          )
        })
      }
    })
  },

  resetPasswordEmail({ dispatch, rootGetters, commit, state }, { credentials }) {
    commit('RECOVERY_VARIATIONS')
    let params = {
      params: {
        url: process.env.URL,
      },
    }

    if (credentials.email != '') {
      return new Promise((resolve, reject) => {
        authAPI.resetPasswordEmail(
          credentials.email,
          params,
          res => {
            commit('REGISTER_USER')
            resolve(res)
          },
          err => {
            if (err.data.message == 'not valid email') {
              dispatch(
                'error/addNew',
                {
                  message: 'The email retrieved is not valid, please, try again with another one.',
                },
                { root: true },
              )
            }

            if (err.data.message == 'company not found') {
              dispatch(
                'error/addNew',
                {
                  message: 'The email retrieved has not any Company associated, please, try again with another one.',
                },
                { root: true },
              )
            }

            if (err.data.message == 'user not found') {
              dispatch(
                'error/addNew',
                {
                  message: 'The email retrieved has not any User associated, please, try again with another one.',
                },
                { root: true },
              )
            }

            if (err.data.message == 'company has sso') {
              dispatch(
                'error/addNew',
                {
                  message: 'The user has Single Sign On associated, please, use the login page.',
                },
                { root: true },
              )
            }

            if (err.status == 500) {
              dispatch(
                'error/addNew',
                {
                  message: 'Server error, please, try again later.',
                },
                { root: true },
              )
            }

            if (getters['error/hasError']) {
              dispatch(
                'error/addNew',
                {
                  message: 'Unexpected error, please, try again later.',
                },
                { root: true },
              )
            }

            reject(err)
            commit('REGISTER_FAILURE')
          },
        )
      })
    } else {
      dispatch(
        'error/addNew',
        {
          message: 'The email field must not be null, please, enter a valid email.',
        },
        { root: true },
      )
      commit('REGISTER_FAILURE')
    }
  },

  register({ dispatch, commit, state, rootGetters }, { credentials }) {
    if (credentials.firstName == '') {
      dispatch(
        'error/addNew',
        {
          message: 'The First Name must not be empty, please, fill it properly.',
        },
        { root: true },
      )
    }

    if (credentials.lastName == '') {
      dispatch(
        'error/addNew',
        {
          message: 'The Last Name must not be empty, please, fill it properly.',
        },
        { root: true },
      )
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(credentials.supervisorEmail).toLowerCase())) {
      dispatch(
        'error/addNew',
        {
          message: 'Invalid Supervisor Email.',
        },
        { root: true },
      )
    }

    const userDomain = credentials.email.replace(/.*@/, "");
    const supervisorDomain = credentials.supervisorEmail.replace(/.*@/, "");
    
    if (userDomain != supervisorDomain) {
      dispatch(
        'error/addNew',
        {
          message: "User and supervisor must share the same email domain.",
        },
        { root: true },
      )
    }

    dispatch('checkIfThePasswordIsStrongEnough', {
      password1: credentials.password1,
      password2: credentials.password2,
    }).then(res => {
      if (res != '') {
        dispatch(
          'error/addNew',
          {
            message: res,
          },
          { root: true },
        )
      }

      if (rootGetters['error/hasError']) {
        commit('REGISTER_FAILURE')
      } else {
        dispatch('getTheModel', { credentials: credentials }).then(response => {
          return new Promise((resolve, reject) => {
            authAPI.register(
              {
                data: response.toJSON(),
              },
              res => {
                commit('REGISTER_USER')
                resolve(res)
              },
              err => {
                reject(err)
                commit('REGISTER_FAILURE')
                if (err.status == 409) {
                  console.log(err)
                  dispatch(
                    'error/addNew',
                    {
                      message: '409',
                    },
                    { root: true },
                  )
                } else {
                  dispatch(
                    'error/addNew',
                    {
                      message: 'Unexpected error. Please, try again later.',
                    },
                    { root: true },
                  )
                }
              },
            )
          })
        })
      }
    })
  },

  login({ dispatch, commit, state }, { router, email }) {
    return new Promise((resolve, reject) => {
      authAPI.login(
        {
          email: email,
        },
        res => {
          window.location.href = res.data.data.redirectUrl
          resolve(res)
        },
        err => {
          commit('LOGIN_FAILURE')
          reject(err)
          if (err.body.error == 'User Not Found, Register Required') {
            router.push({
              name: 'register',
              params: {
                email: email,
              },
            })
          } else if (err.body.error == 'Invalid Email') {
            dispatch(
              'error/addNew',
              {
                message: err.body.error,
              },
              { root: true },
            )
          } else if (err.body.error == 'User Found, Password Required') {
            router.push({
              name: 'loginLocal',
              params: {
                email: email,
              },
            })
          } else if (err.body.error == 'Company Not Found') {
            dispatch(
              'error/addNew',
              {
                message: err.body.error,
              },
              { root: true },
            )
          } else if (err.body.error == 'User not Active') {
            dispatch(
              'error/addNew',
              {
                message: err.body.error + ', ' + err.body.message,
              },
              { root: true },
            )
          } else {
            dispatch(
              'error/addNew',
              {
                message: 'Unexpected server error. Please contact the administrator.',
              },
              { root: true },
            )
          }
        },
      )
    })
  },

  loginLocal({ dispatch, commit, state }, { router, credentials, returnUrl }) {
    if (credentials.password == '' || credentials.password == null) {
      dispatch(
        'error/addNew',
        {
          message: 'The Password must not be empty, please, fill it properly.',
        },
        { root: true },
      )
    }

    return new Promise((resolve, reject) => {
      commit('LOGIN_REQUEST')
      authAPI.loginLocal(
        {
          email: credentials.email,
          password: credentials.password,
        },
        res => {
          console.log('loginLocal', res)
          let current_time = new Date().getTime()
          const result = {
            user_id: res.data.user_id,
            token: _.extend({ created_at: current_time, updated_at: current_time }, res.data),
            profile: {},
          }
          commit(types.AUTH_LOGIN_SUCCESS, result)
          dispatch('profile', { res: res, router: router, returnUrl: returnUrl }).then(res => resolve(true), err => reject(err))
        },
        err => {
          commit(types.AUTH_LOGIN_FAILURE)
          if (err.status == 500) {
            dispatch(
              'error/addNew',
              {
                message: 'Unexpected server error. Please contact the administrator.',
              },
              { root: true },
            )
          } else {
            dispatch(
              'error/addNew',
              {
                message: err.body.message,
              },
              { root: true },
            )
          }
          reject(err)
        },
      )
    })
  },

  singleSignOn({ dispatch, commit, state }, { router, id }) {
    return new Promise((resolve, reject) => {
      commit('LOGIN_REQUEST')
      authAPI.singleSignOn(
        {
          uuid: id,
        },
        re => {
          let current_time = new Date().getTime()
          const result = {
            user_id: re.data.user_id,
            token: _.extend({ created_at: current_time, updated_at: current_time }, re.data),
            profile: {},
          }
          commit(types.AUTH_LOGIN_SUCCESS, result)
          router.push({ name: 'login' })
          dispatch('profile', { res: re, router: router, returnUrl: '' })
        },
        er => {
          commit('LOGIN_FAILURE')
          router.push({ name: 'login' })
          if (er.status == 500) {
            dispatch(
              'error/addNew',
              {
                message: 'Unexpected server error. Please contact the administrator.',
              },
              { root: true },
            )
          } else {
            dispatch(
              'error/addNew',
              {
                message: er.body.message,
              },
              { root: true },
            )
          }
          reject(er)
        },
      )
    })
  },

  logout({ commit }, {router}) {
    commit('warningPopupFlagOff')

    document.cookie = "nav-item=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "nav-inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    heap.track('User logged out', {'clicked': 'yes'})

    commit(types.AUTH_LOGOUT)

    history.go(0);
    router.push({ path: '/login' })
  },

  trackEventWithAnalytics({ state }, data) {
    const { type, value } = data
    let payload = {
      fullName: `${state.profile.firstName} ${state.profile.lastName}`,
      companyName: state.company.object.title,
      email: state.profile.email,
      userId: state.userId,
      identification: state.profile.identification,
    }

    if (type === 'contact_support') {
      payload['selectedOption'] = value
    }

    analytics.track(type, payload)
  },

  setShowWelcomeFlag({ commit }, flag) {
    Storage.set('show_welcome_flag', flag)
    commit('setShowWelcomeFlag', flag)
  },

  setCompanyAllowedDomains({commit, state}) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'domains',
        }
      }
      let companyId = state.profile.companyId
      companyAPI.get(
        companyId,
        _params,
        res => {
          commit(types.AUTH_SET_COMPANY_DOMAINS, res)
          resolve()
        },
        err => {
          console.log(err)
          reject()
        }
      )
    })
  },

}

// mutations
const mutations = {
  [types.AUTH_LOGIN_REQUEST](state) {
    state.isAuthenticating = true
  },

  warningPopupFlagOn(state) {
    state.warningPopupFlag = true
  },

  warningPopupFlagOff(state) {
    state.warningPopupFlag = false
  },

  [types.AUTH_REGISTER_USER](state) {
    state.variations.message = 'Your user has been created correctly, please, check your email to validate it.'
    state.variations.allowChanges = false
    state.variations.clickAgain = false
    state.variations.messageShow = true
  },

  [types.AUTH_LOGIN_FAILURE](state) {
    Storage.removeAll()

    state.userId = null
    state.token = null
    // state.refreshToken = null
    state.profile = null

    state.isAuthenticating = false
  },

  [types.AUTH_REGISTER_FAILURE](state) {
    state.variations.message = ''
    state.variations.clickAgain = true
  },

  [types.AUTH_LOGIN_SUCCESS](state, result) {
    // console.log('AUTH_LOGIN_SUCCESS', result)
    Storage.set('userId', result.user_id)
    Storage.set('token', JSON.stringify(result.token))
    // Storage.set('token', result.token)
    // Storage.set('refreshToken', result.refresh_token)
    // Storage.set('profile', JSON.stringify(result.profile))

    state.userId = result.user_id
    state.token = result.token
    // state.token = result.token
    // state.refreshToken = result.refresh_token
    state.profile = result.profile

    // state.isAuthenticating = false
  },

  [types.AUTH_REFRESH_TOKEN](state, result) {
    result.updated_at = new Date().getTime()
    // console.log('AUTH_REFRESH_TOKEN', result)
    Storage.set('token', JSON.stringify(result))
    state.token = result
  },

  [types.AUTH_LOGIN_DONE](state) {
    state.isAuthenticating = false
  },

  [types.AUTH_LOGOUT](state) {
    Storage.removeAll()

    state.userId = null
    state.token = null
    // state.refreshToken = null
    state.profile = null
  },

  [types.AUTH_PASSWORD_RECOVERY](state) {
    state.variations.errorShow = false
    state.variations.messageShow = false
    state.variations.clickAgain = false
  },

  [types.AUTH_SET_PROFILE](state, profile) {
    // Storage.set('profile', JSON.stringify(profile))
    state.profile = profile
  },

  [types.AUTH_SET_COMPANY_DOMAINS](state, res) {
    let companyData = store.sync(res.body)
    state.allowedDomains = []
    companyData.domains.forEach(domainInfo => {
      (!!domainInfo.active) ? state.allowedDomains.push(domainInfo.domain) : null
    })
  },

  setShowTicket(state, show_ticket) {
    state.show_ticket = show_ticket
  },

  setTicketIssue(state, ticket_issue) {
    state.ticket_issue = ticket_issue
  },

  setCompany(state, company) {
    state.company = company
  },

  setCompanyLoading(state, company_loading) {
    state.company_loading = company_loading
  },

  setUserInfo(state, userInfo) {
    // console.log('auth/setUserInfo', userInfo);
    state.userInfo = userInfo
  },

  recoveryVariations(state) {
    state.variations.allowChanges = true
    state.variations.clickAgain = true
    state.variations.messageShow = false
    state.variations.message = ''
  },

  setShowWelcomeFlag(state, flag) {
    state.profile.show_welcome_flag = flag
  },
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations,
}
