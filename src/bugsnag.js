import bugsnag from '@bugsnag/js'
//Client key
const bugsnagClient = bugsnag(process.env.BUGSNAG_API_KEY)

export { bugsnagClient }