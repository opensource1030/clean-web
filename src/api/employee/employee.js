import Vue from 'vue'
import Employee from './../../models/Employee'

var {Store} = require('yayson')();
var store = new Store();

export default {

  dataEmployee(context) {
    var result = JSON.parse(localStorage.getItem("userProfile"));
    var employee = new Employee(result.id, result.firstName, result.lastName, result.email, result.alternateEmail, result.supervisorEmail)

    context.$http.get(process.env.URL_API + '/companies/' + result.companyId, {
      params: {
        include:'udls'
      },
    }).then((response) => {


      if (result.address.length != 0) {
        employee.setActive(true, employee)
          employee.setShippingAdress(result.address[0], employee)
      }else{
        employee.setActive(false, employee)
      }
      let event = store.sync(response.data);


      if (result.udlvalues!= undefined && event.udls.length != 0) {
        employee.setUdl(result.udlvalues, event.udls, employee);

      }

     context.uiemployee = employee;

    }, (response) => {});

  },
  updateProfile(context, employee) {

    if (employee.udls.length = !0){
      employee.setUdlValues(employee.udls, employee)
    }
    if (employee.active == true) {
      employee.setAddresUpdate(employee.shippingAddress, employee);
    }

    context.$http.patch(process.env.URL_API + '/users/' + employee.id, {"data": employee.toJSON()}).then((response) => {
      context.$router.push({name: 'profile'});

    }, (response) => {});

  }

}
