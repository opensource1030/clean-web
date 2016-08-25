import {router} from '../app'
import Vue from 'vue'
// Check the user's auth status when the app
// loads to account for page refreshing
const api="http://clean.api";


export default {
  // User object will let us check authentication status
 user: {
   authenticated: false,

 },


 // Send a request to the login URL and save the returned JWT
login(context, creds, redirect) {

  context.$http.get(api+'/doSSO/'+creds.email+'/?redirectToUrl=http://localhost:3000/%23!/sso/').then((response) => {

          window.location.href =response.data.data.redirectUrl;

        }, (response) => {

            if(response.data.error==="User Not Found, Register Required"){
                  //console.log(response.data.error);
                    context.error=response.data.error
                   router.go('register');
            }
            else{
              //console.log(response.data.error);
              router.go('loginLocal');
              localStorage.removeItem("email");

              localStorage.setItem('email',creds.email);
            }


        });
},

singleSignOn(context,creds,redirect){

  context.$http.post(api+'/oauth/access_token',
                      {
                        grant_type: 'sso',
                        client_id:'g73hhd8j3bhcuhdbbs88e4wd',
                        client_secret:'786wndkd8iu4nn49ixjndfodsde33',
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

      });



},

register(context,creds,redirect){


},
loginLocal(context,creds,redirect){

  if( creds.password=="" ||creds.password==null){
      context.error="Password incorrect";

  }
  else{

  context.$http.post(api+'/oauth/access_token',
                      {
                        grant_type: 'password',
                        client_id:'g73hhd8j3bhcuhdbbs88e4wd',
                        client_secret:'786wndkd8iu4nn49ixjndfodsde33',
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

    router.go('/');
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
