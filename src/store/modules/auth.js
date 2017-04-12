import auth from './../../api/auth-api'
import * as types from './../mutation-types'
import user from './../../models/User'
import Vue from 'vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);
// initial state
const state = {
    // email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    profile: JSON.parse(localStorage.getItem('userProfile')) || {},
    // authenticated: false,
    isAuthenticating: false,
    variations: {
        clickAgain: true,
        allowChanges: true,
        messageShow: true,
        message: ''
    }

}
// Prepare the Model
// getters
const getters = {
    isAuthenticated: (state) => {
        // console.log('isAuthenticated ...', state.userId, state.token)
        return (!!state.token) && (!!state.userId)
    },
    getVariations: (state) => {
        return state.variations
    }
}

// actions
const actions = {

    getTheModel({
        dispatch,
        commit,
        state
    }, {credentials}) {
        return new user('users', 0, '', '', credentials.email, '', credentials.password1, '', '', '', '', credentials.firstName, credentials.lastName, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '');

    },
    profile({
        dispatch,
        commit,
        state
    }, {res, router}) {
        return new Promise((resolve, reject) => {
            auth.profile({
                token: res.data.access_token
            }, (response) => {
                const result = {
                    user_id: res.body.user_id,
                    token: res.body.access_token,
                    profile: response
                }

                commit('LOGIN_SUCCESS', result)
                Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                router.push({name: 'dashboard'});
                resolve(result)
            }, (error) => {

                commit('LOGIN_FAILURE')
                dispatch('error/addNew', {
                    message: "Unexpected server error. Please contact the administrator."
                }, {root: true})
                reject(error)
            })
        })

    },

    checkIfThePasswordIsStrongEnough({
        dispatch,
        commit,
        state
    }, {password1, password2}) {
        if (password1 == '' || password2 == '') {
            return 'The Passwords must not be empty, please, fill it properly.';
        }
        if (password1 != password2) {

            return 'The Passwords must be equals, please, fill it properly.';
        }

        if (password1.length < 6) {
            return 'Password must contain at least six characters!';
        }

        let re = /[0-9]/;
        if (!re.test(password1)) {
            return 'Password must contain at least one number (0-9)!';
        }

        re = /[a-z]/;
        if (!re.test(password1)) {
            return 'Password must contain at least one lowercase letter (a-z)!';
        }

        re = /[A-Z]/;
        if (!re.test(password1)) {
            return 'Password must contain at least one uppercase letter (A-Z)!';
        }

        return '';
    },

    resetPasswords({
        dispatch,
        rootGetters,
        commit,
        state
    }, {router, credentials}) {

        commit('RECOVERY_VARIATIONS')
        dispatch('checkIfThePasswordIsStrongEnough', {
            password1: credentials.password1,
            password2: credentials.password2
        }).then(response => {
            if (response != "") {
                dispatch('error/addNew', {
                    message: response
                }, {root: true});
            }

            if (rootGetters['error/hasError']) {
                commit('REGISTER_FAILURE')
            } else {
                let params = {
                    params: {
            password1: credentials.password1,
            password2: credentials.password2
                    }
                };

                return new Promise((resolve, reject) => {
                    auth.resetPasswords(credentials.identification, credentials.code, params, (res) => {
                        router.push({name: 'login'});
                        resolve(res)
                    }, (err) => {
                        if (err.data.message == 'different identifications') {

                            dispatch('error/addNew', {
                                message: 'The link has been expired, please, return to the forgot password and retrieve another one.'
                            }, {root: true})
                        }
                        if (err.data.message == 'different codes') {

                            dispatch('error/addNew', {
                                message: 'The link has been expired, please, return to the forgot password and retrieve another one.'
                            }, {root: true})
                        }
                        if (err.data.message == 'user not found') {

                            dispatch('error/addNew', {
                                message: 'The credentials has not any user associated, please, return to the forgot password and retrieve another one.'
                            }, {root: true})
                        }
                        if (err.data.message == 'different passwords') {

                            dispatch('error/addNew', {
                                message: 'The password fields must be equal and not empty, please, try again.'
                            }, {root: true})
            }
                        if (err.status == 500) {

                            dispatch('error/addNew', {
                                message: 'Unexpected error, please, try again later.'
                            }, {root: true})
            }

                        //commit('REGISTER_FAILURE')
                        if (err.status == 409) {
                            dispatch('error/addNew', {
                                message: err.body.errors.users
                            }, {root: true})

                        } else {
                            dispatch('error/addNew', {
                                message: 'Unexpected error. Please, try again later.'
                            }, {root: true})

                        }
                        reject(err)

                    })
                })

            }
        })

    },
    resetPasswordEmail({
        dispatch,
        rootGetters,
        commit,
        state
    }, {credentials}) {
        commit('RECOVERY_VARIATIONS')
        let params = {
            params: {
                'url': process.env.URL
            }
        };
        if (credentials.email != '') {
            return new Promise((resolve, reject) => {

                auth.resetPasswordEmail(credentials.email, params, (res) => {
                    commit('REGISTER_USER')
                    resolve(res)
                }, (err) => {
                    if (err.data.message == 'not valid email') {

                        dispatch('error/addNew', {
                            message: 'The email retrieved is not valid, please, try again with another one.'
                        }, {root: true})
                    }
                    if (err.data.message == 'company not found') {

            dispatch('error/addNew', {
                message: 'The email retrieved has not any Company associated, please, try again with another one.'
            }, {root: true})
                    }
                    if (err.data.message == 'user not found') {

                        dispatch('error/addNew', {
                            message: 'The email retrieved has not any User associated, please, try again with another one.'
                        }, {root: true})
                    }
                    if (err.data.message == 'company has sso') {

            dispatch('error/addNew', {
                message: 'The user has Single Sign On associated, please, use the login page.'
            }, {root: true})
                    }
                    if (err.status == 500) {

            dispatch('error/addNew', {
                message: 'Server error, please, try again later.'
            }, {root: true})
                    }
                    if (getters['error/hasError']) {

                        dispatch('error/addNew', {
                            message: 'Unexpected error, please, try again later.'
                        }, {root: true})
                    }
                    reject(err)
                    commit('REGISTER_FAILURE')

                })
            })

        } else {
            dispatch('error/addNew', {
                message: 'The email field must not be null, please, enter a valid email.'
            }, {root: true})
            commit('REGISTER_FAILURE')
        }

    },
    register({
        dispatch,
        commit,
        state,
        rootGetters
    }, {credentials}) {

        if (credentials.firstName == '') {
            dispatch('error/addNew', {
                message: 'The First Name must not be empty, please, fill it properly.'
            }, {root: true});
        }
        if (credentials.lastName == '') {
            dispatch('error/addNew', {
                message: 'The Last Name must not be empty, please, fill it properly.'
            }, {root: true});

        }
        dispatch('checkIfThePasswordIsStrongEnough', {
            password1: credentials.password1,
            password2: credentials.password2
        }).then(res => {
            if (res != "") {
                dispatch('error/addNew', {
                    message: res
                }, {root: true});
            }

            if (rootGetters['error/hasError']) {
                commit('REGISTER_FAILURE')
            } else {

                dispatch('getTheModel', {credentials: credentials}).then(response => {

                    return new Promise((resolve, reject) => {

                        auth.register({
                            data: response.toJSON()
                        }, (res) => {
                            commit('REGISTER_USER')
                            resolve(res)
                        }, (err) => {

                            reject(err)
                            commit('REGISTER_FAILURE')
                            if (err.status == 409) {
                                console.log(err)
                                dispatch('error/addNew', {
                                    message: '409'
                                }, {root: true})

                            } else {
                                dispatch('error/addNew', {
                                    message: 'Unexpected error. Please, try again later.'
                                }, {root: true})

                            }

            })
                    })
                })
            }
        })

    },

    login({
        dispatch,
        commit,
        state
    }, {router, email}) {
        if (email == "" || email == null) {
            dispatch('error/addNew', {
                message: "The Email must not be empty, please, fill it properly."
            }, {root: true})
        } else {

            return new Promise((resolve, reject) => {
                auth.login({
                    email: email
                }, (res) => {
                    window.location.href = res.data.data.redirectUrl;
                    resolve(res)
                }, (err) => {
                    commit('LOGIN_FAILURE')
                    reject(err)
                    if (err.body.error == "User Not Found, Register Required") {
                        router.push({
                            name: 'register',
                            params: {
                                email: email
                            }
                        });
                    } else if (err.body.error == "Invalid Email") {
            dispatch('error/addNew', {
                message: err.body.error
            }, {root: true})
                    } else if (err.body.error == "User Found, Password Required") {

                        router.push({
                            name: 'loginLocal',
                            params: {
                                email: email
                            }
                        });
                    } else if (err.body.error == "Company Not Found") {
                        dispatch('error/addNew', {
                            message: err.body.error
                        }, {root: true})
                    } else {
                        dispatch('error/addNew', {
                            message: "Unexpected server error. Please contact the administrator."
                        }, {root: true})
                    }

        })
            })
        }
    },

    loginLocal({
        dispatch,
        commit,
        state
    }, {router, credentials}) {
        if (credentials.password == '' || credentials.password == null) {
            dispatch('error/addNew', {
                message: "The Password must not be empty, please, fill it properly."
            }, {root: true})
        }

        return new Promise((resolve, reject) => {
            commit('LOGIN_REQUEST')
            auth.loginLocal({
                email: credentials.email,
                password: credentials.password
            }, (res) => {
                dispatch('profile', {res: res, router: router});
            }, (err) => {

                commit('LOGIN_FAILURE')
                if (err.status == 500) {
                    dispatch('error/addNew', {
                        message: "Unexpected server error. Please contact the administrator."
                    }, {root: true})
                } else {
                    dispatch('error/addNew', {
                        message: err.body.message
                    }, {root: true})
                }
                reject(err)
            })
        })
    },
    singleSignOn({
        dispatch,
        commit,
        state
    }, {router, id}) {

        return new Promise((resolve, reject) => {
            commit('LOGIN_REQUEST')
            auth.singleSignOn({
                uuid: id
            }, (re) => {
                dispatch('profile', {res: re, router: router});
            }, (er) => {

                commit('LOGIN_FAILURE')
                if (er.status == 500) {
                    dispatch('error/addNew', {
                        message: "Unexpected server error. Please contact the administrator."
                    }, {root: true})
                } else {
                    dispatch('error/addNew', {
                        message: er.body.message
                    }, {root: true})
                }
                reject(er)
            })
        })
    },

    logout({commit}) {
        commit('LOGOUT')
    }
}

// mutations
const mutations = {
    [types.AUTH_LOGIN_REQUEST](state) {
        state.isAuthenticating = true
    },
    [types.AUTH_REGISTER_USER](state) {
        state.variations.message = 'Your user has been created correctly, please, check your email to validate it.';
        state.variations.allowChanges = false;
        state.variations.clickAgain = false;
        state.variations.messageShow = true;
    },

    [types.AUTH_LOGIN_FAILURE](state) {
        state.isAuthenticating = false
    },
    [types.AUTH_REGISTER_FAILURE](state) {
        state.variations.message = '';
        state.variations.clickAgain = true;
    },

    [types.AUTH_LOGIN_SUCCESS](state, result) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('userId', result.user_id)
        localStorage.setItem('userProfile', JSON.stringify(result.profile))

        state.token = result.token
        state.userId = result.user_id
        state.profile = result.profile

        state.isAuthenticating = false
        // state.authenticated = true
    },

    [types.AUTH_LOGOUT](state) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');

        state.token = null
        state.userId = null
        state.profile = null

        // state.authenticated = false
    },
    [types.AUTH_PASSWORD_RECOVERY](state) {

        state.variations.errorShow = false;
        state.variations.messageShow = false;
        state.variations.clickAgain = false;

    },

    [types.AUTH_SET_PROFILE](state, result) {
        localStorage.setItem('userProfile', JSON.stringify(result.profile))

        state.profile = result.profile
    },
    recoveryVariations(state) {
        state.variations.allowChanges = true;
        state.variations.clickAgain = true;
        state.variations.messageShow = false;
        state.variations.message = '';
    }
}

export default {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations
}
