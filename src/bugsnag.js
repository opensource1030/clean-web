//importing bugsnag tool
import bugsnag from '@bugsnag/js'
import store from '@/store'
//Client key
//ff1b86eaaf4a5afb137f0a1d046256bb
const bugsnagClient = bugsnag('b8d51fdf471e8ce2c7d117f5d4e9bc2f')

let user = store.getters['auth/getProfile']
let authenticated = store.getters['auth/isAuthenticated']

if (authenticated) {
    bugsnagClient.user = {
        id: user.id,
        email: user.email,
    }
}

export { bugsnagClient }