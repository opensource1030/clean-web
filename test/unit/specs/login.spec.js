import Vue from 'vue'
import Login from 'src/components/Login.vue'
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('Login.vue', () => {
it('Render Login Component', () => {
const vm = new Vue(Login).$mount();
 })
})
