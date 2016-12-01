export default class Employee {

  constructor(id,firstName, lastName, email, alternateEmail, supervisorEmail) {
      this.id=id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.alternateEmail = alternateEmail;
    this.supervisorEmail = supervisorEmail;
    this.udls = [];
    this.active=false;
    this.shippingAddress={};
  }





    setUdl(udlvalues,udlss,employee){

        for(let udl of  udlss){

          for(let udlvalue of udlvalues){

              if(udl.label==udlvalue.udlLabel){
                udl = Object.assign({}, udl, {
                  selected: udlvalue.id,

                });

              }

          }
          employee.udls.push(udl)

        }



    }

    setShippingAdress(addres,employee){
        employee.shippingAddress=addres;

    }
    setActive(pr,employee){
        employee.active=pr;

    }

  





}
