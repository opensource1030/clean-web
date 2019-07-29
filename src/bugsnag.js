//importing bugsnag tool
import bugsnag from '@bugsnag/js'
import store from '@/store'
//Client key
const bugsnagClient = bugsnag('ff1b86eaaf4a5afb137f0a1d046256bb')

export { bugsnagClient }