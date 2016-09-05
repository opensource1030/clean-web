import {router} from '../app'
import Vue from 'vue'
import config from './../../config/config'
// Check the user's auth status when the app
// loads to account for page refreshing



export default {
  // User object will let us check authentication status
 user: {
   authenticated: false,

 },


 // Send a request to the login URL and save the returned JWT
login(context, creds, redirect) {
  if( creds.email=="" ||creds.email==null){
      context.error="Empty email";

  }
  else{

  context.$http.get(config.urlApi+'/doSSO/'+creds.email+'/?redirectToUrl='+config.url+'/%23!/sso').then((response) => {

          window.location.href =response.data.data.redirectUrl;

        }, (response) => {


            if(response.data.error==="User Not Found, Register Required"){
                  //console.log(response.data.error);
                    context.error=response.data.error
                   router.go('register');
            }
            else if(response.data.error==="Invalid Email"){
              context.error=response.data.error;
            }

            else if(response.data.error=="User Found, Password Required"){
              //console.log(response.data.error);
              router.go('loginLocal');
              localStorage.removeItem("email");

              localStorage.setItem('email',creds.email);
            }
            else{
                context.error="Server Error"


            }


        });
      }
},

singleSignOn(context,creds,redirect){

  context.$http.post(config.urlApi+'/oauth/access_token',
                      {
                        grant_type: 'sso',
                        client_id:config.client_id,
                        client_secret:config.client_secret,
                        uuid:creds

                        })
       .then((response) => {
              //   console.log(response.data);
                    this.user.authenticated=true;
                   localStorage.setItem('token', response.data.access_token);
               //  Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

               setTimeout( ()=> {this.logout();},response.data.expires_in*1000);


                    router.go('../'+redirect);


      }, (response) => {

                context.error="Server error";

      });



},

register(context,creds,redirect){


},
loginLocal(context,creds,redirect){

  if( creds.password=="" ||creds.password==null){
      context.error="Password incorrect";

  }
  else{

  context.$http.post(config.urlApi+'/oauth/access_token',
                      {
                        grant_type: 'password',
                        client_id:config.client_id,
                        client_secret:config.client_secret,
                        username:creds.email,
                        password:creds.password,

                        })
       .then((response) => {
                console.log(response.data);
                    this.user.authenticated=true;
                   localStorage.setItem('token', response.data.access_token);
                   setTimeout( ()=> {this.logout();},response.data.expires_in*1000);
                    router.go('../'+redirect);


      }, (response) => {
          console.log(response.data.message);
          context.error=response.data.message;



      });
    }

},
logout() {
    localStorage.removeItem('token')
    this.user.authenticated = false

    router.go('login');
  },


checkAuth() {
    var jwt = localStorage.getItem('token')

    if(jwt) {
      this.user.authenticated = true

    }
    else {
      this.user.authenticated = false

    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    }

}
