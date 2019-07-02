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
    this.relationships={};
    this.shippingAddress={};
    this.udlValues=[];
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
  setAddresUpdate(address,employee){
console.log(address)
    employee.relationships = Object.assign({}, employee.relationships, {
      address: {
        data:address
      },

    });


  }
    setUdlValues(udls,employee){
          for(let udl of udls){
          employee.udlValues.push( {
            "type": "udlvalues",
            "id": parseInt(udl.selected)
          })
          }
          employee.relationships = Object.assign({}, employee.relationships, {
            udlvalues: {
              data:employee.udlValues
            },

          });

          console.log(employee.relationships)
    }


    setShippingAdress(addres,employee){
        employee.shippingAddress=addres;

    }
    setActive(pr,employee){
        employee.active=pr;

    }

    toJSON() {
         return {
           type:"users",
          id:parseInt(this.id),
           attributes: {
             first_name: this.firstName,
             lastName: this.lastName,
             email: this.email,
             alternateEmail:this.alternateEmail,
             supervisor_email:this.supervisorEmail,
          },
          relationships:this.relationships

         };
       }

}
